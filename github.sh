#!/bin/bash

github_path=$1
add_file=$2
thedate=`date +%m/%d/%Y`
cd ${github_path}
git add ${add_file}
git commit -m ${thedate}
git push

