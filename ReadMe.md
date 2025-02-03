# React Forum Actions App

This is a project to demonstrate my ability to work with the Next.js framework.. As part of my deep dive into React 19

Skill Hightlights:
Next.js

- App Router (File system inside app, page, layout, error, not-found, loading-out)
- Dynamic Routes
- Client and server components
- revalidatePath to update cache
- Metadata and dynamically generated metadata.
- Server side input validation

React Concepts:

- Suspense, useFormState, useFormStatus

Database, Data Storage:

- SQLite
- Storing files on the server
- AWS S3
- XSS protection (Cross Site Script attack pervention)

Last run using: node v20.15.0

package includes:
<better-sqlite3> for use as database.
<xss> to protect against cross side scrypting attacks.
<slugify> to create strict strings used for naming.
<aws-sdk/client-s3> for AWS S3 resource access and storing.

.env file REQUIRED. Templated as follows:

```
AWS_REGION=ca-central-1
S3_BUCKET=gavynelrick-nextjs-demo-user-images.s3.amazonaws.com
AWS_ACCESS_KEY_ID=<your aws access key>
AWS_SECRET_ACCESS_KEY=<your aws secret access key>

IMAGE_STORING=aws # aws | local (default)
```

1. npm i

2. Package includes a Better SQLite3 database. Initiate the database with:
   node initdb.js

initdb.js contains the initial values and if the structure is respected, more data can be added.

3. To start project.
   npm run dev
