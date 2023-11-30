// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react'
import MAIN_ENDPOINT, { HTTP_SERVER_IMAGES } from '../../constants';
import axios from 'axios'
import AddCar from './AddCar';
import { Button, Container, IconButton, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import EditCar from './EditCar';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export type CarType = {
  id : number,
  brand: string,
  fuel_type: string,
  gearbox: string,
  model: string,
  price: number,
  available: number,
  photo : string
}

const skelton = (<Skeleton variant="rectangular" width='100%' height={400} />);
// const progress = (<LinearProgress />);

export default function Cars() {
  
  const [cars,setCars] = useState<CarType[]>([]);
  const [drawState, setDrawState] = useState(false);
  const [editDrawState, setEditDrawState] = useState(false);
  const [isLoading , setIsLoading] = useState(true);
  const [isProgress,setIsProgress] = useState(false)
  const [carId,setCarId] = useState<number>()

  const selectedCar:CarType = cars.filter(car => car.id === carId)[0]
  
  /**
   * Confirm Delete Dialog Section
  */
  const [open, setOpen] = useState(false);

  const handleShowDialog = (car_id:number) => {
    setOpen(true);
    setCarId(car_id)
  };

  //on click on yes or no button in the dialog
  const handleClose = (isYesButton?: boolean) => {
    //in both cases we need to close the dialog
    setOpen(false);

    //if the user clicked on yes then we have to delete a row
    if (isYesButton) {
      axios.delete(`${MAIN_ENDPOINT}cars/${carId}`).then(response => {
        if (response.data.code == 1) {
          
        }
      })
    }
  };
  /******************************************************* */


  useEffect(()=>{
      setIsLoading(true)
      axios.get(`${MAIN_ENDPOINT}cars`).then((response) => {
        setCars(response.data.data)
        setIsLoading(false)
      })
    
  },[isProgress])

  const handleDrawState = (dState:boolean) => {
    setDrawState(dState)
  }

  const showEditDraw = (dState:boolean,id?:number) => {
    setEditDrawState(dState)
    setCarId(id)
  }

  return (

    <>
      <Container sx={{marginTop:'15px'}}>
      { isLoading ? skelton : 
      (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Brand</StyledTableCell>
                  <StyledTableCell align="center">Fuel Type</StyledTableCell>
                  <StyledTableCell align="center">Gear Box</StyledTableCell>
                  <StyledTableCell align="center">Model</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Available</StyledTableCell>
                  <StyledTableCell align="center">Photo</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cars.map((car) => (
                  <StyledTableRow 
                    key={car.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {car.brand}
                    </StyledTableCell>
                    <StyledTableCell align="center">{car.fuel_type}</StyledTableCell>
                    <StyledTableCell align="center">{car.gearbox}</StyledTableCell>
                    <StyledTableCell align="center">{car.model}</StyledTableCell>
                    <StyledTableCell align="center">{car.price}</StyledTableCell>
                    <StyledTableCell align="center">{car.available}</StyledTableCell>
                    <StyledTableCell align="center">
                      
                      <IconButton color='primary' size="small" href={`${HTTP_SERVER_IMAGES}${car.photo}`} target='_blank'>
                        <PreviewIcon />
                      </IconButton >
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton color='warning' size="small" onClick={()=>showEditDraw(true,car.id)}>
                        <EditIcon />
                      </IconButton >
                      <IconButton color='error' size="small" onClick={()=>handleShowDialog(car.id)}>
                        <DeleteIcon />
                      </IconButton >
                    </StyledTableCell>
                  </StyledTableRow >
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          { drawState ? (<AddCar 
            drawState={drawState} 
            handleDrawState = {handleDrawState} 
            setIsProgress={setIsProgress}
          />) : ''}

          {
            editDrawState ? (<EditCar
              drawState={editDrawState} 
              handleDrawState = {showEditDraw} 
              setIsProgress={setIsProgress}
              selectedCar={selectedCar}
            />) : ''
          }

          <Button onClick={()=>handleDrawState(true)} variant='contained' sx={{marginTop:'10px',marginBottom:'10px'}}>Add</Button>

          <ConfirmationDialog
                keepMounted
                open={open}
                onClose={handleClose}
          />


        </>
      ) }
      </Container>
    </>
  );
}