// Import required AWS SDK clients and commands for Node.js
import { AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import { TextractClient } from '@aws-sdk/client-textract';
import { fromIni } from '@aws-sdk/credential-providers';

// Set the AWS Region.
const REGION = 'us-east-2'; //e.g. "us-east-2"
const profileName = 'default';

// Create SNS service object.
const textractClient = new TextractClient({
  region: REGION,
  credentials: fromIni({ profile: profileName }),
});

const displayBlockInfo = async (response) => {
  try {
    const sentences = [];
    response.Blocks.forEach((block) => {
      //console.log(`ID: ${block.Id}`)
      //console.log(`Block Type: ${block.BlockType}`)
      if (
        block.BlockType === 'LINE' &&
        'Text' in block &&
        block.Text !== undefined
      ) {
        sentences.push(block.Text);
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
    return sentences.join(' ');
  } catch (err) {
    console.log('Error', err);
  }
};

export const analyze_document_text = async (photo) => {
  try {
    // Set params
    const bucket = 'snapgpt-screenshots';

    const params = {
      Document: {
        S3Object: {
          Bucket: bucket,
          Name: photo,
        },
      },
      FeatureTypes: ['TABLES'],
    };

    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);
    //console.log(response)
    const text = displayBlockInfo(response);
    return text; // For unit tests.
  } catch (err) {
    console.log('Error', err);
  }
};
