module.exports = {
  imageSrc:
    process.env.IMAGE_STORING === "aws" && process.env.S3_BUCKET
      ? `https://${process.env.S3_BUCKET}`
      : "/images",
};
