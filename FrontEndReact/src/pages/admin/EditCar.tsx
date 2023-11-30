
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
import { CarType } from './Cars';
// import { useNavigate } from 'react-router';

type EditCarPropsType = {
    drawState : boolean
    handleDrawState : (drawState:boolean,id?:number) => void
    setIsProgress : (isProgress:boolean) => void
    selectedCar : CarType
} | {}

export default function EditCar(props:EditCarPropsType) {
    
  if ('drawState' in props && 'handleDrawState' in props) {

const { drawState, handleDrawState, setIsProgress,selectedCar} = props;

  // const navigate = useNavigate()
  const [photo, setPhoto] = useState<File | null>(null);
 
  const [brand,setBrand] = useState(selectedCar?.brand);
  const [fuelType,setFuelType] = useState(selectedCar?.fuel_type);
  const [gearBox,setGearBox] = useState(selectedCar?.gearbox);
  const [model,setModel] = useState(selectedCar?.model);
  const [price,setPrice] = useState(selectedCar?.price+'');
  const [isAvailable,setIsAvailable] = useState(selectedCar?.available == 1 ? 'Yes' : 'No');


  const handleChangePhoto = (newPhoto: File | null) => {
    setPhoto(newPhoto)  
  };
  const handleSubmit = (e:FormEvent) => {
    setIsProgress(true)
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
            anchor="left"
            transitionDuration={500}
            open={drawState}
            onClose={()=>handleDrawState(false,selectedCar.id)}
            PaperProps={{
              sx: { width: "300px" },
            }}
          >
          
            <Container>
              <List>
                  
                  <ListItem disablePadding>
                  <Typography variant="h5" align='center' sx={{marginBottom:'10px'}}  color="primary">
                    Edit A Car
                  </Typography>
                  </ListItem>
               
                <form onSubmit={handleSubmit}>
                  <ListItem disablePadding>
                      <TextField 
                          value={brand} 
                          onChange={(e)=> setBrand(e.target.value)}
                          sx={{marginBottom:'10px'}} 
                          label="Brand" 
                          variant="outlined" 
                          fullWidth 
                      />
                  </ListItem>
                  
                  <ListItem disablePadding>
                      <TextField 
                        value={fuelType} 
                        onChange={(e)=> setFuelType(e.target.value)}
                        sx={{marginBottom:'10px'}} 
                        label="Fuel Type" 
                        variant="outlined" 
                        fullWidth 
                      />
                  </ListItem>

                  <ListItem disablePadding>
                      <TextField 
                        value={gearBox} 
                        onChange={(e)=> setGearBox(e.target.value)}
                        sx={{marginBottom:'10px'}} 
                        label="Gear Box" 
                        variant="outlined" 
                        fullWidth 
                      />
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
                      <InputLabel id="select-available">Available</InputLabel>
                      <Select
                        labelId="select-available"
                        id="demo-simple-select"
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
                      inputProps={{ accept: '.png, .jpeg, .jpg' }}
                      InputProps={{
                        startAdornment: <AttachFileIcon />
                      }}
                      sx={{width:'100%',marginBottom:'10px',marginTop:'10px'}}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                      <Button type="submit" variant='contained'>Save</Button>
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