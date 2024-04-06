import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { baseUrl, getToken } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDescription, setSearchDescription] = useState("");

  const getProducts = () => {
    axios
      .get(`${baseUrl}/product/list`, {
        params: {
          title: searchTitle,
          description: searchDescription,
        },
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`${baseUrl}/product/${productId}`, {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        getProducts();
      })
      .catch((error) => {
        Alert.alert("Failed", "delete unsuccesfull!");
        console.error("Error delete data: ", error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    getProducts();
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={searchDescription}
                    onChange={(e) => setSearchDescription(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
              {products.map((row) => (
                <Grid item xs={12} md={6}>
                  <Card sx={{ display: "flex" }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography component="h2" variant="h5">
                        {row.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {row.time}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {row.description}
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Button
                            size="small"
                            variant="outlined"
                            component={Link}
                            to={"/editproducts/" + row.id}
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </Button>
                        </Grid>

                        <Grid item xs={6}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              deleteProduct(row.id);
                            }}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{
                        width: 160,
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                      image={row.image}
                      alt={row.title}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
