import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async upload(file, name) {
    const bucketS3 = 'snapgpt-screenshots';
    console.log(file);
    await this.uploadS3(file.buffer, bucketS3, name);
  }

  async uploadS3(file: string, bucket: string, name: string) {
    const client = this.getS3();
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: name,
      Body: file,
    });
    try {
      const response = await client.send(command);
    } catch (err) {
      console.error(err);
    }
  }

  getS3() {
    const cred = {
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    };
    console.log(cred);
    return new S3Client({
      region: 'us-east-2',
      credentials: cred,
    });
  }
}

import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //console.log(req);
    next();
  }
}
