
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
            return true;
        default:
            return false;
    }
}


const main = () => {
    args = process.argv.slice(2);
    if(args.length != 1) {
        console.log("Usage: node iamex.js <path to cfn file>");
        process.exit(1);
    }

    let contents = readFileContent(args[0]);
    parsed = yamlParse(contents);
    resources = parsed['Resources'];
    Object.keys(resources).forEach((k) => {
        console.log(k);
        console.log(resources[k]['Type'])
        console.log(retainResource(resources[k]['Type']));

        let retain = retainResource(resources[k]['Type']);

        if(retain == false) {
            console.log(`delete ${k}`);
            delete resources[k];
        }
    });

    console.log(JSON.stringify(parsed,null, '  '));

}

main();