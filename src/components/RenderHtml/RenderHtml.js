import { StyleSheet, Text, View } from 'react-native';
import { parseDOM } from 'htmlparser2';
import { isNullOrEmpty } from '@function';

// Function to convert inline style string to a JavaScript object
const parseInlineStyles = (styleString) => {
    const styleObject = {};
    if (styleString) {
        styleString.split(';').forEach((style) => {
            if (style.trim()) {
                const [property, value] = style.split(':');
                const camelCaseProperty = property.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObject[camelCaseProperty] = value.trim();
            }
        });
    }

    for (let key in styleObject) {
        if (key.includes("padding")) {
            styleObject[key] = Number(styleObject[key].replace('px', '').trim());
        }
    }

    return styleObject;
};

// Function to map HTML elements to React Native components
const renderNode = (node, key) => {
    if (node.type === 'text') {
        const parentstyle = parseInlineStyles(node?.parent?.attribs?.style || '');
        let style = {};

        if(!isNullOrEmpty(parentstyle)){
            for (let key in parentstyle) {
                if (key.includes("color") || key.includes("font")) {
                    style[key] = parentstyle[key];
                }
            }
        }

        return (
            <Text key={key} style={[style]}>{node.data}</Text>
        )
    }

    if (node.type !== 'tag') {
        return null;
    }

    const style = parseInlineStyles(node.attribs.style || '');
    const children = (node.children || []).map((childNode, index) => renderNode(childNode, index));

    switch (node.name) {
        case 'p':
            return <Text key={key} style={[style]}>{children}</Text>;
        case 'b':
            return <Text key={key} style={[style, { fontWeight: 'bold', }]}>{children}</Text>;
        case 'span':
            return <Text key={key} style={[style]}>{children}</Text>;
        case 'div':
            return <View key={key} style={[style]}>{children}</View>;
        default:
            return <Text key={key} style={style}>{children}</Text>;
    }
};

export default function RenderHtml({ value }) {
    const parsedHTML = parseDOM(value);

    return (
        <>
            {parsedHTML.map((node, index) => renderNode(node, index))}
        </>
    )
}