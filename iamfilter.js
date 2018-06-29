
const fs = require('fs');
const { yamlParse, yamlDump } = require('yaml-cfn');


const readFileContent = (cfnfile) => {
    let contents = fs.readFileSync(cfnfile, 'utf8');
    return contents;
}

const retainResource = (resourceType) => {
    switch(resourceType) {
        case 'AWS::IAM::Role':
        case 'AWS::IAM::Policy':
        case 'AWS::IAM::ManagedPolicy':
            return true;
        default:
            return false;
    }
}

const getInputTemplate = () => {
    args = process.argv.slice(2);
    if(args.length != 1) {
        console.log("Usage: node iamex.js <path to cfn file>");
        process.exit(1);
    }

    return readFileContent(args[0]);
}

const filterResources = (resources) => {
    Object.keys(resources).forEach((k) => {
        let retain = retainResource(resources[k]['Type']);
        if(retain == false) {
            delete resources[k];
        }
    });
}


const main = () => {
    let contents = getInputTemplate();
    parsed = yamlParse(contents);
    filterResources(parsed['Resources']);
    console.log(JSON.stringify(parsed,null, '  '));
}

main();