// utils/fileUpload.js
import fs from 'fs/promises';
import path from 'path';

/**
 * Handle file upload by saving to public/uploads directory
 * @param {File} file - The file to upload
 * @param {string} subfolder - Optional subfolder (e.g., 'organizations', 'banners')
 * @returns {Promise<string>} - The public URL path to the uploaded file
 */
export async function handleFileUpload(file, subfolder = '') {
  if (!file || file.size === 0) {
    return null;
  }

  // Create a unique filename to avoid collisions
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const extension = path.extname(file.name);
  const filename = `${timestamp}-${randomSuffix}${extension}`;

  // Create the full path
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', subfolder);
  const filePath = path.join(uploadDir, filename);

  // Ensure the upload directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // Convert file to buffer and save
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  // Return the public URL path
  const publicPath = `/uploads/${subfolder ? subfolder + '/' : ''}${filename}`;
  return publicPath;
}

/**
 * Delete a file from the uploads directory
 * @param {string} filePath - The file path to delete (e.g., '/uploads/organizations/123-abc.jpg')
 */
export async function deleteUploadedFile(filePath) {
  if (!filePath || !filePath.startsWith('/uploads/')) {
    return;
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting file:', error);
    // Don't throw - file deletion failure shouldn't break the app
  }
}
