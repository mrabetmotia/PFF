import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FilledInput from "@mui/material/FilledInput";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import jwt_decode from 'jwt-decode';

const schema = z.object({
  nom: z.string().nonempty("Nom is required"),
  description: z.string().nonempty("Description is required"),
  spesialite: z.string().nonempty("Spesialite is required"),
  experiance: z.string().nonempty("Experiance is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().nonempty("Phone is required"),
});

export default function AddCoach() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    spesialite: '',
    description: '',
    image: '',
    experiance: '',
    email: '',
    phone: '',
    video: ''
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleImageFileChange = (e:any) => setImageFile(e.target.files[0]);
  const handleCvFileChange = (e:any) => setCvFile(e.target.files[0]);
  const handleVideoFileChange = (e:any) => setVideoFile(e.target.files[0]);

  const uploadFile = async (file, folder) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "coachs");
      formData.append("folder", `coachs/${folder}`);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnyt40i17/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("File uploading error");
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: { email?: string; phone?: string; nom?: string;first_name?:string } = jwt_decode(token);
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: decoded.email || '',
          phone: decoded.phone || '',
          nom: decoded.first_name || ''
        }));
      } catch (error) {
        console.error('Invalid token', error); // Log the error to the console
      }
    }
  }, []);

  const handleSaveCoach = async (data:any) => {
    try {
      if (imageFile) {
        const imageUrl = await uploadFile(imageFile, "image");
        data.image = imageUrl;
      }

      if (cvFile) {
        const cvUrl = await uploadFile(cvFile, "cv");
        data.cv = cvUrl;
      }

      if (videoFile) {
        const videoUrl = await uploadFile(videoFile, "video");
        data.video = videoUrl;
      }

      const response = await axios.post("http://localhost:9000/coach", data);
      if (response.status === 200) {
        toast.success("Coach created successfully , with for validation");
        router.push("/coach");
      } else {
        toast.error("Server response error");
      }
    } catch (error) {
      toast.error("Coach creation error");
      console.error(error);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          mt: 5,
        }}
      >
        <Typography variant="h4" component="h1">
          Add Coach
        </Typography>
        <form
          onSubmit={handleSubmit(handleSaveCoach)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            width: "100%",
          }}
        >
          <TextField
            id="nom"
            name="nom"
            label="Nom"
            value={formData.nom}
            variant="outlined"
            {...register("nom")}
            error={!!errors.nom}
            helperText={errors.nom?.message}
            fullWidth
          />
                    <TextField
            sx={{
              mt: 1,
            }}
            id="email"
            name="email"
            label="email"
            value={formData.email}
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            sx={{
              mt: 1,
            }}
            type="number"
            id="phone"
            value={formData.phone}
            name="phone"
            label="phone"
            variant="outlined"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
          />
          <TextField
            sx={{
              mt: 1,
            }}
            id="description"
            name="description"
            label="description"
            variant="outlined"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
          />
          <TextField
            sx={{
              mt: 1,
            }}
            id="spesialite"
            name="spesialite"
            label="spesialite"
            variant="outlined"
            {...register("spesialite")}
            error={!!errors.spesialite}
            helperText={errors.spesialite?.message}
            fullWidth
          />
          <TextField
            sx={{
              mt: 1,
            }}
            type="number"
            id="experiance"
            name="experiance"
            label="experiance"
            variant="outlined"
            {...register("experiance")}
            error={!!errors.experiance}
            helperText={errors.experiance?.message}
            fullWidth
          />

          <Box sx={{ mt: 1, width: "100%" }}>
            <label htmlFor="video" className="label">
              Select your video
            </label>
            <FilledInput
              type="file"
              onChange={handleVideoFileChange}
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 1, width: "100%" }}>
            <label htmlFor="image" className="label">
              Select your image
            </label>
            <FilledInput
              label="Select your image"
              type="file"
              onChange={handleImageFileChange}
            />
          </Box>

          <Box sx={{ mt: 1, width: "100%" }}>
            <label htmlFor="cv" className="label">
              Select your cv with type jpg or png
            </label>
            <FilledInput type="file" onChange={handleCvFileChange} />
          </Box>

          <Button className="btnsave" variant="outlined" startIcon={<SendIcon />} type="submit">
            Save
          </Button>
        </form>
      </Box>
    </Container>
  );
}
