
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React, { FormEvent } from 'react';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import {useState} from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile'


import { MuiFileInput } from 'mui-file-input'
import MAIN_ENDPOINT from '../../constants';
import axios from 'axios';
// import { useNavigate } from 'react-router';

type AddCarPropsType = {
    drawState : boolean
    handleDrawState : (drawState:boolean) => void
    setIsProgress : (isProgress:boolean) => void
} | {}

export default function AddCar(props:AddCarPropsType) {

  if ('drawState' in props && 'handleDrawState' in props) {

const { drawState, handleDrawState, setIsProgress } = props;
  // const navigate = useNavigate()
  const [photo, setPhoto] = useState<File | null>(null);
 
  const [brand,setBrand] = useState('');
  const [fuelType,setFuelType] = useState('');
  const [gearBox,setGearBox] = useState('');
  const [model,setModel] = useState('');
  const [price,setPrice] = useState('');
  const [isAvailable,setIsAvailable] = useState('');


  const handleChangePhoto = (newPhoto: File | null) => {
    setPhoto(newPhoto)  
  };
  const handleSubmit = (e:FormEvent) => {
    // setIsProgress(true)
    e.preventDefault() 
    if (photo) {
    
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('brand', brand);
        formData.append('fuel_type', fuelType);
        formData.append('gearbox', gearBox);
        formData.append('model', model);
        formData.append('price', price);
        formData.append('available', isAvailable);

        axios.post(`${MAIN_ENDPOINT}cars/store`,formData)
        .then(res => {
          console.log(res.data.data)
        })
        .catch(err => {console.log(err)})
        .finally(()=>{setIsProgress(false)})
      
      
    }else{
      alert('add photo please')
    }
  }
 
  return (
    <div>
      
        <React.Fragment>
          

          <Drawer
            anchor="right"
            transitionDuration={500}
            open={drawState}
            onClose={()=>handleDrawState(false)}
            PaperProps={{
              sx: { width: "300px" },
            }}
          >
          
            <Container>
              <List>
                  
                <Typography 
                  variant="h5" 
                  align='center' 
                  sx={{marginBottom:'10px'}}  
                  color="primary">
                  Add New Car
                </Typography>

                <form onSubmit={handleSubmit}>

                  <ListItem disablePadding>
                      <TextField 
                          value={brand} 
                          onChange={(e)=> setBrand(e.target.value)}
                          sx={{marginBottom:'10px'}} 
                          label="Brand" 
                          variant="outlined" 
                          fullWidth 
                          // error={!brand ? true : false}
                          // helperText={!brand ? 'This field is required' : ''}
                      />
                  </ListItem>
                  
                  <ListItem disablePadding>

                    <FormControl fullWidth style={{marginBottom:'10px'}}>
                      <InputLabel>Fuel Type</InputLabel>
                      <Select
                        value={fuelType}
                        label="Fuel Type"
                        onChange={ (e) => setFuelType(e.target.value) }
                      >
                        <MenuItem value='diesel'>Diesel</MenuItem>
                        <MenuItem value='petrol'>Petrol</MenuItem>
                      </Select>
                    </FormControl>
                    
                  </ListItem>

                  <ListItem disablePadding>
                    <FormControl fullWidth style={{marginBottom:'10px'}}>
                      <InputLabel>Gear Box</InputLabel>
                      <Select
                        value={gearBox}
                        label="Gear Box"
                        onChange={ (e) => setGearBox(e.target.value) }
                      >
                        <MenuItem value='automatic'>Automatic</MenuItem>
                        <MenuItem value='manuel'>Manuel</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>

                  <ListItem disablePadding>
                      <TextField 
                        value={model} 
                        onChange={(e)=> setModel(e.target.value)}
                        sx={{marginBottom:'10px'}} 
                        label="Model" 
                        variant="outlined" 
                        fullWidth 
                      />
                      
                  </ListItem>

                  <ListItem disablePadding>
                      <TextField 
                        value={price} 
                        onChange={(e)=> setPrice(e.target.value)}
                        sx={{marginBottom:'10px'}} 
                        label="Price" 
                        variant="outlined" 
                        fullWidth 
                      />
                  </ListItem>

                  <ListItem disablePadding>

                    <FormControl fullWidth>
                      <InputLabel>Available</InputLabel>
                      <Select
                        value={isAvailable}
                        label="Available"
                        onChange={ (e) =>setIsAvailable(e.target.value) }
                      >
                        <MenuItem value='Yes'>Yes</MenuItem>
                        <MenuItem value='No'>No</MenuItem>
                      </Select>
                    </FormControl>

                  </ListItem>

                  <ListItem disablePadding>
                    <MuiFileInput
                      placeholder="Upload a car photo"
                      value={photo}
                      onChange={handleChangePhoto}
                      inputProps={{ accept: '.png, .jpeg, .jpg, .jfif' }}
                      InputProps={{
                        startAdornment: <AttachFileIcon />
                      }}
                      sx={{width:'100%',marginBottom:'10px',marginTop:'10px'}}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                      <Button type="submit" variant='contained'>Add</Button>
                  </ListItem>
                </form>
              </List>
            </Container>


          </Drawer>
        </React.Fragment>
      
    </div>
  );
  }
}