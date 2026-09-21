// Cloudinary configuration for Bridal Mirror
export const CLOUDINARY_CLOUD_NAME = "dam7nzlnp";
export const CLOUDINARY_UPLOAD_PRESET = "bridal_mirror_uploads";

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Uploads an image (from Expo ImagePicker result) to Cloudinary.
 * @param {string} imageUri - local file uri from expo-image-picker (asset.uri)
 * @returns {Promise<string>} the secure_url of the uploaded image
 */
export async function uploadImageToCloudinary(imageUri) {
  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg",
  });
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  return data.secure_url;
}