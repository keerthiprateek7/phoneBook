import React,{useEffect, useState} from 'react'
import { Paper, TableCell, TableRow,TableContainer,TableHead,Table,TableBody, TablePagination,Button } from '@material-ui/core'
import PhoneAddressForm from './PhoneAddressForm'
import { makeStyles,withStyles } from '@material-ui/core'
import * as phoneService from './phoneService'
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Notification from './Notification'
import ConfirmDialog from './ConfirmDialog'
import Popup from './Popup'

const useStyles = makeStyles((theme) => ({
    paper:{
      margin: theme.spacing(5),
      padding:theme.spacing(3)
    },
    table: {
        marginTop:20,
        minWidth: 100,
      },
  }));

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  

  

export default function Contact() {
    const classes = useStyles();
    const [records,setRecords]=useState()
    const [page,setPage]=useState(0)
    const [rowsPerPage,setRowsPerPage]=useState(5)
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)
    


    useEffect(()=>{
        setRecords(phoneService.getAllContacts)
    },[])

    const handleChangePage=(event,newPage)=>{
        setPage(newPage)
    }
    
    const handleChangeRowsPerPage=(event)=>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        phoneService.deleteContact(id);
        setRecords(phoneService.getAllContacts())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    //console.log(records)

    const openInPopup = row => {
      console.log(row)
      setRecordForEdit(row)
      setOpenPopup(true)
  }

  const addOrEdit = (contact, resetForm) => {
    if (contact.id === 0)
        phoneService.insertContact(contact)
    else
        phoneService.updateContacts(contact)
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords(phoneService.getAllContacts())
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
  })
}

    return (
        <div>
            <Paper className={classes.paper}>
             <PhoneAddressForm />
             {records?
             <>
             <TableContainer >
             <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Country</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : records
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell  align="right">
                {row.lastName}
              </TableCell>
              <TableCell  align="right">
                {row.extension}
              </TableCell>
              <TableCell align="right">
                {row.phoneNumber}
              </TableCell>
              <TableCell align="right">
              <Button
                                            color="primary"
                                            onClick={() => { openInPopup(row) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Button>
              <Button color="secondary"  onClick={() => {setConfirmDialog({ isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(row.id) }
                                                })
                }} >
                                           
                <CloseIcon fontSize="small" />
              </Button>
                                        
             </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
             </TableContainer>
             <TablePagination rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }] } colSpan={3}
              count={records.length} rowsPerPage={rowsPerPage}
              page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}
              />
             </>:""}
            </Paper>
            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <PhoneAddressForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            
        </div>
    )
}
