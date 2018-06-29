# iam-filter

This project provides a simple utility to filter a cloud formation template to leave only IAM Role and IAM Policy resources in the template. This input is a YAML cloud formation template, the output is a cloud formation template containing only the IAM Role and Policy resources in JSON format (don't ask).

Usage:

````console
npm install
node iamfilter.js /path/to/file.yaml
````

The filtered template is written to stdout.

Note that any policy references to resources created by the original template are currently left unresolved - you will need to manually update the filtered template to inject resource ARNs/etc as template parameters.
