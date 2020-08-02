regions=( eu-central-1 us-east-1 ap-south-1 )
npm install
for region in "${regions[@]}"
do
    serverless deploy --region $region
done
