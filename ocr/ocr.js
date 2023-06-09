// Import required AWS SDK clients and commands for Node.js
import { AnalyzeDocumentCommand } from  "@aws-sdk/client-textract";
import  { TextractClient } from "@aws-sdk/client-textract";
import {fromIni} from '@aws-sdk/credential-providers';

// Set the AWS Region.
const REGION = "us-east-2"; //e.g. "us-east-2"
const profileName = "default";

// Create SNS service object.
const textractClient = new TextractClient({region: REGION, 
  credentials: fromIni({profile: profileName,}), 
});

const bucket = 'snapgpt-screenshots'
const photo = 'first.png'

// Set params
const params = {
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: photo
      },
    },
    FeatureTypes: ['TABLES'],
  }

const displayBlockInfo = async (response) => {
    try {
        response.Blocks.forEach(block => {
            //console.log(`ID: ${block.Id}`)
            //console.log(`Block Type: ${block.BlockType}`)
            if (block.BlockType === 'LINE' && "Text" in block && block.Text !== undefined){
                console.log(`Text: ${block.Text}`)
            }
            //else{} if ("Confidence" in block && block.Confidence !== undefined){
            //    console.log(`Confidence: ${block.Confidence}`)
            //}
            //else{}
            //if (block.BlockType == 'CELL'){
            //    console.log("Cell info:")
            //    console.log(`   Column Index - ${block.ColumnIndex}`)
            //    console.log(`   Row - ${block.RowIndex}`)
            //    console.log(`   Column Span - ${block.ColumnSpan}`)
            //    console.log(`   Row Span - ${block.RowSpan}`)
            //}
            //if ("Relationships" in block && block.Relationships !== undefined){
            //    console.log(block.Relationships)
            //    console.log("Geometry:")
            //    console.log(`   Bounding Box - ${JSON.stringify(block.Geometry.BoundingBox)}`)
            //    console.log(`   Polygon - ${JSON.stringify(block.Geometry.Polygon)}`)
            //}
            //console.log("-----")
        });
      } catch (err) {
        console.log("Error", err);
      }
}

const analyze_document_text = async () => {
    try {
        const analyzeDoc = new AnalyzeDocumentCommand(params);
        const response = await textractClient.send(analyzeDoc);
        return displayBlockInfo(response)
      } catch (err) {
        console.log("Error", err);
      }
}

analyze_document_text()