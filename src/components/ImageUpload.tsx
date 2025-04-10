import { useState } from "react";
import { Upload, Button, message, Image, Space } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { uploadImage } from "../utility";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUploaded,
  currentImageUrl 
}) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl || '');

  const validateFile = (file: File) => {
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      message.error('Image must be smaller than 5MB');
      return false;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      message.error('You can only upload JPG, PNG, GIF, or WEBP files');
      return false;
    }

    return true;
  };

  const handleUpload = async (file: File) => {
    if (!validateFile(file)) {
      return false;
    }

    try {
      setLoading(true);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase
      const url = await uploadImage(file);
      onImageUploaded(url);
      setPreviewUrl(url);
      message.success("Image uploaded successfully");
    } catch (error) {
      message.error("Failed to upload image");
      console.error(error);
      setPreviewUrl(currentImageUrl || '');
    } finally {
      setLoading(false);
    }
    return false;
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onImageUploaded('');
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {previewUrl && (
        <div style={{ marginBottom: 16 }}>
          <Image
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
          />
        </div>
      )}
      <Upload
        accept="image/jpeg,image/png,image/gif,image/webp"
        showUploadList={false}
        beforeUpload={handleUpload}
        maxCount={1}
      >
        <Button 
          icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
          loading={loading}
          style={{ marginBottom: 8 }}
        >
          {previewUrl ? 'Change Image' : 'Upload Image'}
        </Button>
      </Upload>
      {previewUrl && (
        <Button 
          danger 
          onClick={handleRemove}
          style={{ marginLeft: 8 }}
        >
          Remove Image
        </Button>
      )}
    </Space>
  );
}; 