import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { baseUrl, getToken } from "../context/AuthContext";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [imageSend, setImageSend] = useState("");

  const getProduct = async () => {
    if (id != "" && id !== undefined) {
      axios
        .get(`${baseUrl}/product/row/${id}`, {
          headers: {
            Authorization: getToken(),
          },
        })
        .then((res) => {
          setTitle(res.data.row.title);
          setDescription(res.data.row.description);
          if (res.data.row.image != "") {
            setImage(res.data.row.image);
          }
        })
        .catch((error) => {
          alert("Network error");
          console.log("Error sending data: ", error);
        });
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const type = image.split(";")[0].split("/")[1];
    const is = image.split(",")[1];
    setImageSend(is);
    setMimeType(type);
  }, [image]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("productId", id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageSend);
    formData.append("mimeType", mimeType);
    axios
      .post(`${baseUrl}/product/save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getToken(),
        },
      })
      .then(() => {
        navigate("/product-list");
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setImage(reader.result);
      };
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography component="h1" variant="h5">
        Product Form
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              accept="image/jpeg,image/png,image/tiff,image/webp"
              id="contained-button-file"
              name="logo"
              type="file"
              onChange={handleUploadClick}
            />
            {image != "" && <img width={100} src={image} />}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save
            </Button>
            <Button
              component={Link}
              variant="contained"
              to={"/product-list"}
              sx={{ ml: 3, mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
