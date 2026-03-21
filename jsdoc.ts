import * as fs from 'fs'
import * as path from 'path'
import * as ts from "typescript";

let files = {}
/**
 * Prints out particular nodes from a source file
 * 
 * @param file a path to a file
 * @param identifiers top level identifiers available
 */
function extract(file: string): string {
    if (files[file]) {
        return
    }
    files[file] = 1
    const sourceFile = ts.createSourceFile(
        file,
        fs.readFileSync(file).toString(),
        ts.ScriptTarget.ES2023,
        true /* setParentNodes */
    );
    return extract_source_file(sourceFile)
}

function extract_source_file(sourceFile: any): string {
    let foundNodes = []

    // Loop through the root AST nodes of the file
    ts.forEachChild(sourceFile, node => {
        foundNodes.push([node.name?.text, node]);
    });

    let idoc = []
    let doc = [`# File: ${sourceFile.fileName}`, "\n\n"]
    foundNodes.map(f => {
        const [_name, node] = f;
        if (ts.isImportDeclaration(node)) {
            const dirname = path.dirname(node.parent.fileName)
            let import_file = node.moduleSpecifier.text + ".ts"
            import_file = path.join(dirname, import_file).normalize()
            idoc.push(extract(import_file))
        }
        if (ts.isFunctionDeclaration(node)) {
            doc.push(new Function(node, sourceFile).toString())
        }
        if (ts.isClassDeclaration(node)) {
            doc.push(new Class(node, sourceFile).toString())
        }
    })
    doc.push(...idoc)
    return doc.join("")
}

class Class {
    name: string;
    props: string[];
    members: string[];
    args: string[];
    prefix: string;
    suffix: string;
    separator: string;
    member_prefix: string;
    constructor(node: any, src: any) {
        this.name = node.name.text
        this.props = []
        this.members = []
        this.prefix = "## Class "
        this.suffix = "\n\n"
        this.separator = "\n"
        this.member_prefix = "  - "
        this._parse(node, src)
    }
    _parse(node: any, src: any) {
        const fopt = { prefix: "### " }
        for (const member of node.members) {
            if (ts.isMethodDeclaration(member)) {
                this.members.push(new Function(member, src, fopt).toString())
            }
            if (ts.isPropertyDeclaration(member)) {
                this.props.push(this.member_prefix +
                    member.name?.getText(src) + ": " +
                    member.type?.getText(src))
            }
        }

        this.args = []
        const con = node.members.find((m: any) => ts.isConstructorDeclaration(m))
        //console.log(con)
        con.parameters.forEach((parameter: any) => {
            if (ts.isParameter(parameter) && parameter.name) {
                // Extract the parameter name
                let paramName = parameter.name.getText(src);

                // Extract the parameter type if available
                let paramType = parameter.type ? `: ${parameter.type.getText(src)}` : '';

                this.args.push(`${paramName}${paramType}`);
            }
        });
    }
    signature() {
        return `'constructor(${this.args.join(", ")})'`
    }
    toString() {
        const sig = this.signature()
        const props = this.props.join("\n")
        const members = this.members.join(this.separator)

        return this.prefix +
            [this.name, "  Members", props, "\n", sig, "\n", members].filter(v => v.length)
                .join(this.separator) + this.suffix
    }
}

class Function {
    name: string;
    comment: string;
    signature: string;
    arglist: string[];
    args: any[]
    returns: any[]
    prefix: string;
    suffix: string;
    separator: string;
    arg_prefix: string;
    arg_separator: string;
    declaration_prefix: string;
    declaration_suffix: string;
    section_prefix: string;
    constructor(node: any, src: any, options: any = {}) {
        this.name = node.name.text
        this.comment = ""
        if (node.jsDoc) {
            this.comment = node.jsDoc[0].comment
        }
        this.arglist = []
        this.args = []
        this.returns = []
        this._get_args(node, src)
        this._get_returns(node, src)
        this.prefix = options.prefix || "## "
        this.suffix = options.suffix || "\n\n"
        this.separator = options.separator || "\n\n"
        this.declaration_prefix = options.declaration_prefix || "`"
        this.declaration_suffix = options.declaration_suffix || "`"
        this.arg_prefix = options.arg_prefix || "   "
        this.arg_separator = options.arg_separator || "\n"
        this.section_prefix = options.section_prefix || "   "


    }
    get_signature() {
        let ret = ""
        if (this.returns.length) {
            ret = ': ' + this.returns[0].type
        }
        return this.declaration_prefix +
            `function ${this.name}(${this.arglist.join(", ")})` +
            ret +
            this.declaration_suffix
    }
    _get_args(node: any, src: any) {
        for (const p of node.parameters) {
            const t = p.type.getText(src)
            const name = p.name.getText(src)
            //console.log('name', name)
            let comment = undefined
            this.arglist.push(`${name}: ${t}`)
            if (node.jsDoc) {
                for (const t of node.jsDoc[0].tags.filter((t: any) => t.tagName.text == "param")) {
                    if (t.name.text == name) {
                        comment = t.comment
                    }
                }
            }
            this.args.push({ name, type: t, comment })
        }
    }
    _get_returns(node: any, src: any) {
        const functype = node.type?.getText(src)
        let comment = undefined
        if (node.jsDoc) {
            for (const t of node.jsDoc[0].tags.filter((t: any) => t.tagName.text == "return")) {
                comment = t.comment
            }
        }
        this.returns.push({ name: null, type: functype, comment })
    }
    format_argument(arg: any) {
        let t = this.arg_prefix
        if (arg.name) {
            t += `- ${arg.name}: ${arg.type}`
        } else {
            t += `- ${arg.type}`
        }
        if (arg.comment) {
            t += ` - ${arg.comment}`
        }
        return t

    }
    format_arguments() {
        if (!this.args.length) { return "" }
        let args = this.args.map(v => this.format_argument(v)).join(this.arg_separator)
        return this.section_prefix + `Arguments\n${args}`
    }
    format_returns() {
        if (!this.returns.length) { return "" }
        let args = this.returns.map(v => this.format_argument(v)).join("\n  -")
        return this.section_prefix + `Returns\n${args}`
    }
    toString() {
        let comment = ""
        if (this.comment.length) {
            comment = this.section_prefix + this.comment
        }
        let args = this.format_arguments()
        let rets = this.format_returns()
        let sig = this.get_signature()
        return this.prefix +
            [this.name, sig, comment, args, rets].filter(v => v.length)
                .join(this.separator) + this.suffix
    }
}

let out = extract(process.argv[2])
console.log(out)
