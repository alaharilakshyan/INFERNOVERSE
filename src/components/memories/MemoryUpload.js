// src/components/memories/MemoryUpload.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Chip,
  IconButton,
} from '@mui/material';

import {
  CloudUpload,
  Close,
  Image,
  VideoLibrary,
  Description,
} from '@mui/icons-material';

import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// ---- Leaflet Map Imports ----
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// ============================
//   Map Location Picker
// ============================
const LocationPicker = ({ position, onPositionChange }) => {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

// ============================
//   Styled Dropzone Container
// ============================
const StyledPaper = styled(Paper)(({ theme, isDragActive }) => ({
  border: `2px dashed ${
    isDragActive ? theme.palette.primary.main : theme.palette.divider
  }`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: isDragActive
    ? 'rgba(25, 118, 210, 0.04)'
    : 'transparent',

  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
}));

// ============================
//        MAIN COMPONENT
// ============================
const MemoryUpload = () => {
  const navigate = useNavigate();

  // Upload states
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    currentTag: '',
  });

  // Map state
  const [position, setPosition] = useState(null);

  const [isUploading, setIsUploading] = useState(false);

  // Dropzone config
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.ogg'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    },
  });

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && formData.currentTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: '',
      }));
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  // Submit handler (mock)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);

      if (position) {
        formDataToSend.append('lat', position.lat);
        formDataToSend.append('lng', position.lng);
      }

      formData.tags.forEach((tag) =>
        formDataToSend.append('tags', tag)
      );

      // API CALL HERE:
      // await api.post('/memories/upload', formDataToSend);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate('/dashboard');
    } catch (error) {
      console.error('Error uploading memory:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // File Icon Handler
  const getFileIcon = () => {
    if (!file)
      return (
        <CloudUpload
          sx={{ fontSize: 48, mb: 2, color: 'action.active' }}
        />
      );

    if (file.type.startsWith('image/'))
      return <Image sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />;

    if (file.type.startsWith('video/'))
      return (
        <VideoLibrary
          sx={{ fontSize: 48, mb: 2, color: 'primary.main' }}
        />
      );

    return (
      <Description
        sx={{ fontSize: 48, mb: 2, color: 'primary.main' }}
      />
    );
  };

  return (
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Upload a New Memory
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Capture and preserve your precious moments.
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* DROZONE */}
          <Box sx={{ mb: 4 }}>
            <StyledPaper {...getRootProps()} isDragActive={isDragActive}>
              <input {...getInputProps()} />
              {getFileIcon()}
              <Typography variant="h6" gutterBottom>
                {isDragActive
                  ? 'Drop the file here'
                  : file
                  ? file.name
                  : 'Drag & drop a file here, or click to select'}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Supports Images + Videos
              </Typography>

              {file && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setPreview('');
                    }}
                    startIcon={<Close />}
                  >
                    Remove
                  </Button>
                </Box>
              )}
            </StyledPaper>

            {/* IMAGE PREVIEW */}
            {preview && file?.type.startsWith('image/') && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{ mt: 3, textAlign: 'center' }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>
            )}
          </Box>

          {/* TEXT FIELDS */}
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          {/* TAG INPUT */}
          <TextField
            fullWidth
            label="Add Tags"
            name="currentTag"
            value={formData.currentTag}
            onChange={handleChange}
            onKeyDown={handleTagAdd}
            margin="normal"
            placeholder="Type and press Enter to add tags"
            InputProps={{
              startAdornment: formData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                  sx={{ mr: 1, mb: 1 }}
                  size="small"
                />
              )),
            }}
          />

          {/* MAP SECTION */}
          <Box sx={{ height: '300px', my: 3 }}>
            <MapContainer
              center={[20, 78]}
              zoom={3}
              style={{ height: '100%', width: '100%' }}
              onClick={(e) => setPosition(e.latlng)}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <LocationPicker
                position={position}
                onPositionChange={setPosition}
              />
            </MapContainer>
          </Box>

          {/* Hidden Inputs */}
          <input type="hidden" name="lat" value={position?.lat || ''} />
          <input type="hidden" name="lng" value={position?.lng || ''} />

          {/* ACTION BUTTONS */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!file || isUploading}
                startIcon={
                  isUploading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <CloudUpload />
                  )
                }
              >
                {isUploading ? 'Uploading...' : 'Upload Memory'}
              </Button>
            </motion.div>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default MemoryUpload;
