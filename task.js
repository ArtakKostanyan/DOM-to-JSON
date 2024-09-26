function getRoot(id) {
    const obj = {};
    const root = generateObjectShape(id);

    if (root) {
        return {
            tagName: root.tagName,
            attributes: getAttributes(root.element),
            children: root.children
        };
    }

    return obj;
}

function getAttributes(element) {
    const attrList = {};
    for (const name of element.getAttributeNames()) {
        attrList[name] = element.getAttribute(name);
    }
    return attrList;
}

function generateObjectShape(id) {
    const root = document.getElementById(id);
    if (!root) return null;

    const tagName = root.tagName.toLowerCase();

    const children = [];

    for (const child of root.children) {
        children.push({
            tagName: child.tagName.toLowerCase(),
            attributes: getAttributes(child),
            children: child.childNodes.length > 0 ? getChilds(child) : []
        });
    }

    return {
        tagName: tagName,
        element: root,
        children: children
    };
}

function getChilds(element) {
    const childNodes = [];
    for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            childNodes.push({
                tagName: '#text',
                textContent: node.textContent.trim()
            });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            childNodes.push({
                tagName: node.tagName.toLowerCase(),
                attributes: getAttributes(node),
                children: getChilds(node)
            });
        }
    }
    return childNodes;
}

const result = getRoot('app');
console.log(result);