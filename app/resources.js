module.exports = {
  imageSrc:
    process.env.IMAGE_STORING === "aws"
      ? `https://${process.env.S3_BUCKET}.s3.amazonaws.com`
      : "/images",
  databaseURL: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=${process.env.MONGODB_APP_NAME}`,
};
