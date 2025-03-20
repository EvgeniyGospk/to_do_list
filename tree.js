const fs = require("fs");
const path = require("path");

function printTree(dir, prefix = "", exclude = ["node_modules", ".git"]) {
    const files = fs.readdirSync(dir).filter(file => !exclude.includes(file));
    files.forEach((file, index) => {
        const fullPath = path.join(dir, file);
        const isLast = index === files.length - 1;
        const marker = isLast ? "└──" : "├──";
        console.log(`${prefix}${marker} ${file}`);

        if (fs.statSync(fullPath).isDirectory()) {
            const newPrefix = prefix + (isLast ? "    " : "│   ");
            printTree(fullPath, newPrefix, exclude);
        }
    });
}

printTree(process.cwd());