
import React, { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/zustand/auth";
import { IHistory, IOrderItem, IOrderReturnItem, IOrderReturn } from "../type/History";
import { getHistoryOrder, getHistoryOrderReturn, getOrderItemHistory, getOrderReturnItemHistory, returnOrder, updateStatus } from "../service/HistoryOrder";
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Tabs, Checkbox, TextField, Autocomplete, TextareaAutosize, } from "@mui/material";
import Tab from '@mui/material/Tab';
import ButtonJoy from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import ModalJoy from '@mui/joy/Modal';
import ModalJoyDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import TypographyJoy from '@mui/joy/Typography';
import moment from "moment";
import { Input } from 'antd';
import Swal from "sweetalert2";
import { Stack } from "@mui/system";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;

}
const { TextArea } = Input;

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})



const OrderHistory2 = () => {
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }
    const format = (value: any) => new Intl.NumberFormat('vi-VN', config).format(value)

    let value_new: number;
    const [value, setValue] = React.useState(0);
    const accessToken = useAuthStore((e) => e.accessToken);
    const [currentStatus, setCurrentStatus] = React.useState(5);
    const [openModal, setOpenModal] = React.useState(0);
    const [openModalReturn, setOpenModalReturn] = React.useState(0);
    const [word, setWord] = useState('');
    const [selected, setSelected] = React.useState<IOrderItem[]>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)
        if (newValue === 0) {
            value_new = 5;
        } else if (newValue === 1) {
            value_new = 6
        } else if (newValue === 2) {
            value_new = 7
        } else if (newValue === 3) {
            value_new = 8
        } else if (newValue === 4) {
            value_new = 10
        } else if (newValue === 5) {
            value_new = 12
        }

        onClickHistory(value_new)
        setValue(newValue);
        setCurrentStatus(value_new);
    };


    // let item : IOrderItem;
    const [history, setHistory] = useState([] as IHistory[]);
    const [historyReturn, setHistoryReturn] = useState([] as IOrderReturn[]);
    const [loading, setLoading] = useState(false);
    const top100Films = [
        { label: 'H??ng l???i' },
        { label: 'Nh???m h??ng' },
        { label: 'Nh???m size, m??u, ch???t li???u' },
        { label: 'H??ng kh??ng ????ng nh?? m?? t???' },
    ];

    useEffect(() => {
        setLoading(true)
        getHistoryOrder(5, accessToken).then((res: any) => {
            setLoading(false)
            const newResult = res.data.map((obj: IHistory) => ({ ...obj, order_item: [] }))
            setHistory(newResult)
        })
    }, [])

    useEffect(() => {
        historyReturn.map((historyReturn) => (
            getOrderReturnItemHistory(historyReturn.id, accessToken).then((res: any) => {
                res.data.map((order_item: IOrderReturnItem) => (
                    console.log(order_item),
                    historyReturn.order_item.push(order_item)
                ))
            })
        ));
    }, [historyReturn])

    const onClickHistory = (status_id: number) => {
        setPage(0);
        setLoading(true)
        if (status_id === 10) {
            let resResult: IHistory[] = []
            getHistoryOrder(status_id, accessToken).then((res: any) => {
                setLoading(false)
                resResult = res.data.map((obj: IHistory) => ({ ...obj, order_item: [] }))
                console.log(res);
                console.log('10', resResult);

                getHistoryOrder(11, accessToken).then((res: any) => {
                    setLoading(false)
                    const newResult = res.data.map((obj: IHistory) => ({ ...obj, order_item: [] }))
                    resResult.concat(newResult)
                })
                console.log(resResult);

                setHistory(resResult)
            })


        } else if (status_id === 12) {
            getHistoryOrderReturn(accessToken).then((res: any) => {
                setLoading(false)
                console.log(res.data);
                const newResult = res.data.map((obj: IOrderReturn) => ({ ...obj, order_item: [] }))
                setHistoryReturn(newResult)
            })
        } else {
            getHistoryOrder(status_id, accessToken).then((res: any) => {
                setLoading(false)
                const newResult = res.data.map((obj: IHistory) => ({ ...obj, order_item: [] }))
                setHistory(newResult)
            })
        }
    }
    const onClickUpdateStatus = (status_id: number, order: IHistory) => {
        const index = history.indexOf(order)
        updateStatus(status_id, order.id, accessToken).then(() => {
            let newList: IHistory[] = [];
            if (index === 0) {
                newList = newList.concat(history.slice(1));
            } else if (index === selected.length - 1) {
                newList = newList.concat(history.slice(0, -1));
            } else if (index > 0) {
                newList = newList.concat(
                    history.slice(0, index),
                    history.slice(index + 1),
                );
            }
            setHistory(newList)
            if (currentStatus === 0) {
                Toast.fire({
                    icon: 'success',
                    title: 'Hu??? ????n h??ng th??nh c??ng'
                })
            }
            if (currentStatus === 2) {
                Toast.fire({
                    icon: 'success',
                    title: 'Nh???n ????n h??ng th??nh c??ng'
                })
            }

        }, (err) => {
            console.log(err);
            if (currentStatus === 0) {
                Toast.fire({
                    icon: 'error',
                    title: 'Hu??? ????n h??ng th???t b???i'
                })
            }
            if (currentStatus === 2) {
                Toast.fire({
                    icon: 'error',
                    title: 'Nh???n ????n h??ng th???t b???i'
                })
            }
        })
    }
    useEffect(() => {
        history.map((history) => (
            getOrderItemHistory(history.id, accessToken).then((res: any) => {
                res.data.map((order_item: IOrderItem) => (
                    // console.log(order_item),
                    history.order_item.push(order_item)
                ))
            })
        ));
    }, [history])

    function checkDate(date_start: Date) {
        //console.log(date_start);
        let date_now = new Date().getTime();
        let date_compare = new Date(date_start).getTime();
        const startDate = moment(date_now);
        const timeEnd = moment(date_compare);
        const diff = startDate.diff(timeEnd);
        const diffDuration = moment.duration(diff);

        if (diffDuration.days() >= 3) {
            return true
        } else {
            return false
        }
    }

    function Row(props: { row: IHistory }) {
        const steps = [
            'Ch??? x??c nh???n',
            'Ch??? l???y h??ng',
            '??ang giao h??ng',
            '???? Nh???n h??ng',
        ];

        const stepsCancel = [
            'Ch??? x??c nh???n',
            '???? hu???',
        ];
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>, rows: IOrderItem[]) => {
            if (event.target.checked) {
                const newSelected = rows;
                setSelected(newSelected);
                return;
            }
            setSelected([]);
        };

        const handleClick = (event: React.MouseEvent<unknown>, orderItem: IOrderItem) => {
            const selectedIndex = selected.indexOf(orderItem);
            let newSelected: IOrderItem[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, orderItem);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
            console.log(newSelected)
            setSelected(newSelected);
        };

        const isSelected = (orderItem: IOrderItem) => selected.indexOf(orderItem) !== -1;
        const hasSelected = selected.length > 0;
        // ghi chu Kh sao khi hoan tra
        const [note, setNote] = useState('');

        // Khach hang hoan tra hang
        const returnOrderbyIdOrder = (idOrder: number) => {
            let totalQuantityReturn: number = 0;
            let totalPriceReturn: number = 0;
            let idOrderItem: number[] = [];
            selected.map((e) => {
                totalQuantityReturn += e.quantity
                totalPriceReturn += e.total_price
                idOrderItem.push(e.id)
            })
            console.log("data" + note, idOrder, totalPriceReturn, totalQuantityReturn, idOrderItem, accessToken)
            returnOrder(note, idOrder, totalPriceReturn, totalQuantityReturn, idOrderItem, accessToken).then((res) => {
                console.log(res.data)
                onClickHistory(8)
                Toast.fire({
                    icon: 'success',
                    title: 'Y??u c???u th??nh c??ng'
                })
            }, (err) => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: 'Y??u c???u th???t b???i'
                })
            })
        };

        // Log ghi chu KH tra hang
        console.log(note);
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                        {row.code}
                    </TableCell>
                    <TableCell align="center">{row.total_quantity}</TableCell>
                    <TableCell align="center">{format(row.total_price)} </TableCell>
                    <TableCell align="center">{format(row.fee_money)} </TableCell>
                    <TableCell align="center">{format(row.totalPrice)} </TableCell>
                    <TableCell align="center" hidden={!(row.status === 5)}>Ch??? x??c nh???n</TableCell>
                    <TableCell align="center" hidden={!(row.status === 6)}>Ch??? x??c ship l???y h??ng</TableCell>
                    <TableCell align="center" hidden={!(row.status === 7)}>??ang giao h??ng</TableCell>
                    <TableCell align="center" hidden={!(row.status === 8)}>Giao h??ng th??nh c??ng</TableCell>
                    <TableCell align="center" hidden={!(row.status === 9)}>Giao h??ng th???t b???i</TableCell>
                    <TableCell align="center" hidden={!(row.status === 10)}>Hu??? b???i ng?????i d??ng</TableCell>
                    <TableCell align="center" hidden={!(row.status === 11)}>Hu??? b???i admin</TableCell>
                    <TableCell align="center">{row.typePay} </TableCell>
                    <TableCell align="center"> {moment(row.created_time).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                    <TableCell align="center">
                        <Button hidden={value === 2 ? false : true} onClick={() => { onClickUpdateStatus(8, row) }}>
                            ???? nh???n ???????c h??ng</Button>
                        <Button variant="outlined" color="error"
                            onClick={() => { setOpenModal(row.id); console.log(row.id) }}
                            hidden={value === 0 ? false : true}
                        >
                            Hu???
                        </Button>
                        <ModalJoy
                            aria-labelledby="alert-dialog-ModalJoy-title"
                            aria-describedby="alert-dialog-ModalJoy-description"
                            open={row.id === openModal}
                            onClose={() => setOpenModal(0)}

                        >
                            <ModalJoyDialog variant="outlined" role="alertdialog">
                                <TypographyJoy
                                    id="alert-dialog-ModalJoy-title"
                                    component="h2"
                                    level="inherit"
                                    fontSize="1.25em"
                                    mb="0.25em"
                                    startDecorator={<WarningRoundedIcon />}
                                >
                                    X??c Nh???n Hu???
                                </TypographyJoy>
                                <Divider sx={{ my: 2 }} />
                                <TypographyJoy
                                    id="alert-dialog-ModalJoy-description"
                                    textColor="text.tertiary"
                                    mb={3}
                                >
                                    B???n c?? ch???c ch???n mu???n h???y ????n h??ng c???a m??nh kh??ng?
                                </TypographyJoy>
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                    <ButtonJoy variant="plain" color="neutral" onClick={() => { setOpenModal(0) }}>
                                        Quay L???i
                                    </ButtonJoy>
                                    <Button variant="text" color="error" onClick={() => { onClickUpdateStatus(10, row); setOpenModal(0) }}>
                                        Hu???
                                    </Button>
                                </Box>
                            </ModalJoyDialog>
                        </ModalJoy>
                    </TableCell>

                </TableRow>
                <TableRow >
                    <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={10}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1, alignContent: "center" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Chi ti???t:
                                </Typography>
                                <Box sx={{ width: '100%' }} hidden={!(row.status === 10 || row.status === 11)}>
                                    <Stepper activeStep={2} alternativeLabel>
                                        {stepsCancel.map((label, index) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                                <Box sx={{ width: '100%' }} hidden={row.status === 10 || row.status === 11}>
                                    <Stepper activeStep={((row.status - 5)==3)?4:(row.status - 5)} alternativeLabel>
                                        {steps.map((label, index) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>

                                <br />
                                <div>?????a ch??? nh???n :  {row.address_id}</div>
                                <br />
                                <Table size="small" aria-label="purchases" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={2}>S???n ph???m</TableCell>
                                            <TableCell align="center">Lo???i</TableCell>
                                            <TableCell align="center">S??? l?????ng</TableCell>
                                            <TableCell align="center">????n gi?? (VN??)</TableCell>
                                            <TableCell align="center">Th??nh ti???n (VN??)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.order_item?.map((order_item) => (
                                            <TableRow key={order_item.id}>
                                                <TableCell align="left" width={100}>
                                                    <img src={order_item.image} width={100} />
                                                </TableCell>
                                                <TableCell align="left" component="th" scope="row" >
                                                    {order_item.name.split('-')[0]}
                                                </TableCell>
                                                <TableCell align="center">{order_item.option1 + ',' + order_item.option2 + ',' + order_item.option3}</TableCell>
                                                <TableCell align="center">{order_item.quantity}</TableCell>
                                                <TableCell align="center">{format(order_item.price)}</TableCell>
                                                <TableCell align="center">{format(order_item.total_price)}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell rowSpan={4} colSpan={3} />
                                            <TableCell colSpan={2}>T???ng ph???:</TableCell>
                                            <TableCell align="center">{format(row.total_price)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>Ph?? v???n chuy???n:</TableCell>
                                            <TableCell align="center">{format(row.fee_money)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>T???ng:</TableCell>
                                            <TableCell align="center">{format(row.totalPrice)}</TableCell>
                                        </TableRow>
                                        <TableRow hidden={value === 3 ? false : true}>
                                            <TableCell colSpan={2}></TableCell>
                                            <TableCell align="right"
                                                hidden={checkDate(row.date_main) || row.isReturn}

                                            > <Button
                                                variant="contained" color="error" onClick={() => { setOpenModalReturn(row.id); setSelected([]); }}>Y??u c???u tr??? h??ng</Button></TableCell>
                                            <TableCell hidden={!row.isReturn} >Ho?? ????n ???? tr??? h??ng</TableCell>
                                            <TableCell hidden={!checkDate(row.date_main)} >Ho?? ????n qu?? h???n tr???</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                        <ModalJoy
                            aria-labelledby="alert-dialog-ModalJoy-title"
                            aria-describedby="alert-dialog-ModalJoy-description"
                            open={row.id === openModalReturn}
                            onClose={() => setOpenModalReturn(0)}
                        >
                            <ModalJoyDialog variant="outlined" role="alertdialog">
                                <TypographyJoy
                                    id="alert-dialog-ModalJoy-title"
                                    component="h2"
                                    level="inherit"
                                    fontSize="1.25em"
                                    mb="0.25em"
                                // startDecorator={<WarningRoundedIcon />}
                                >
                                    Ch???n s???n ph???m c???n tr???
                                </TypographyJoy>
                                <Divider sx={{ my: 2 }} />
                                <TypographyJoy
                                    id="alert-dialog-ModalJoy-description"
                                    textColor="text.tertiary"
                                    mb={3}
                                >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={row.order_item.length === selected.length}
                                                        onChange={(e) => handleSelectAllClick(e, row.order_item)}
                                                        inputProps={{
                                                            'aria-label': 'select all',
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center" colSpan={2}>S???n ph???m</TableCell>
                                                <TableCell align="center">Lo???i</TableCell>
                                                <TableCell align="center">S??? l?????ng</TableCell>
                                                <TableCell align="center">????n gi?? (VN??)</TableCell>
                                                <TableCell align="center">Th??nh ti???n (VN??)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {row.order_item?.map((order_item) => (
                                                <TableRow key={order_item.id}
                                                    hover
                                                    onClick={(event) => handleClick(event, (order_item))}
                                                    role="checkbox"
                                                    aria-checked={isSelected((order_item))}
                                                    tabIndex={-1}
                                                    selected={isSelected((order_item))}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isSelected(order_item)}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left" width={100}>
                                                        {/* <Avatar src={order_item.image} /> */}
                                                        <img src={order_item.image} width={100} />
                                                    </TableCell>
                                                    <TableCell align="left" component="th" scope="row" >
                                                        {order_item.name.split('-')[0]}
                                                    </TableCell>
                                                    <TableCell align="center">{order_item.option1 + ',' + order_item.option2 + ',' + order_item.option3}</TableCell>
                                                    <TableCell align="center">{order_item.quantity}</TableCell>
                                                    <TableCell align="center">{format(order_item.price)}</TableCell>
                                                    <TableCell align="center">{format(order_item.total_price)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                    <label htmlFor="">L?? do tr??? h??ng:</label>
                                    <div>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="L?? do tr??? h??ng"
                                            style={{ width: 700, height: 100 }}
                                            value={note}
                                            onChange={e => setNote(e.target.value)}
                                        />
                                    </div>
                                </TypographyJoy>
                                <Box component="form" sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }} >
                                    <ButtonJoy variant="plain" color="neutral" onClick={() => { setOpenModalReturn(0) }}>
                                        Quay L???i
                                    </ButtonJoy>
                                    <Button variant="text" disabled={!hasSelected} color="error" type="submit" onClick={() => {
                                        // console.log('note_string', note_string);
                                        returnOrderbyIdOrder(row.id); 
                                        setOpenModalReturn(0)
                                    }}>
                                        Tr??? h??ng
                                    </Button>
                                </Box>
                            </ModalJoyDialog>

                        </ModalJoy>
                    </TableCell>
                </TableRow>
            </React.Fragment >
        );
    }
    function RowReturn(props: { row: IOrderReturn }) {
        const steps = [
            'Ch??? xem x??t',
            'Shop ?????i nh???n h??ng',
            'Shop ???? nh???n ???????c h??ng ho??n',
            'Shop ???? ho??n ti???n',
          ];
          const stepsCancel = [
            'Ch??? xem x??t',
            'Shop t??? ch???i y??u c???u ho??n tr???',
          ];
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.code}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.codeInvoice}
                    </TableCell>
                    <TableCell align="center">{row.total_quantity_return}</TableCell>
                    <TableCell align="center">{format(row.total_price_return)} </TableCell>
                    <TableCell align="center">{row.note} </TableCell>
                    <TableCell align="center" hidden={!(row.status_return === 12)}>Ch??? xem x??t</TableCell>
                    <TableCell align="center" hidden={!(row.status_return === 13)}>Shop ?????i nh???n h??ng ho??n</TableCell>
                    <TableCell align="center" hidden={!(row.status_return === 14)}>T??? ch???i y??u c???u</TableCell>
                    <TableCell align="center" hidden={!(row.status_return === 15)}>Shop ???? nh???n ???????c h??ng ho??n</TableCell>
                    <TableCell align="center" hidden={!(row.status_return === 16)}>Shop ???? ho??n ti???n</TableCell>
                    <TableCell align="center">{moment(row.create_date).format('DD/MM/YYYY')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1, alignContent: "center" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Chi ti???t:
                                </Typography>
                                <Box sx={{ width: '100%' }} hidden={!(row.status_return === 14)}>
                                    <Stepper activeStep={2} alternativeLabel>
                                        {stepsCancel.map((label, index) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                                <Box sx={{ width: '100%' }} hidden={!(row.status_return < 14 )}>
                                    <Stepper activeStep={row.status_return - 12} alternativeLabel>
                                        {steps.map((label, index) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                                <Box sx={{ width: '100%' }} hidden={!(row.status_return > 14 )}>
                                    <Stepper activeStep={((row.status_return - 13)==3)?4:(row.status_return - 13)} alternativeLabel>
                                        {steps.map((label, index) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>

                                <br />
                                <div>?????a ch??? nh???n : </div>
                                <Table size="small" aria-label="purchases" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={2}>S???n ph???m</TableCell>
                                            <TableCell align="center">Lo???i</TableCell>
                                            <TableCell align="center">S??? l?????ng</TableCell>
                                            <TableCell align="center">????n gi?? (VN??)</TableCell>
                                            <TableCell align="center">Th??nh ti???n (VN??)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.order_item?.map((order_item) => (
                                            <TableRow key={order_item.name}>
                                                <TableCell align="left" width={100}>
                                                    {/* <Avatar src={order_item.image} /> */}
                                                    <img src={order_item.image} width={100} />
                                                </TableCell>
                                                <TableCell align="left" component="th" scope="row" >
                                                    {order_item.name.split('-')[0]}
                                                </TableCell>
                                                <TableCell align="center">{order_item.optionProduct}</TableCell>
                                                <TableCell align="center">{order_item.quantity}</TableCell>
                                                <TableCell align="center">{format(order_item.price)}</TableCell>
                                                <TableCell align="center">{format(order_item.totalPrice)}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell rowSpan={4} colSpan={3} />
                                            <TableCell colSpan={2}>T???ng:</TableCell>
                                            <TableCell align="center">{format(row.total_price_return)} </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment >
        );
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // ---------------------------------------------------------


    return (
        <div className="checkout-container container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">L???CH S??? ????N H??NG</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Trang ch???</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">l???ch s??? ????n h??ng</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Ch??? x??c nh???n" {...a11yProps(0)} />
                            <Tab label="Ch??? l???y h??ng" {...a11yProps(1)} />
                            <Tab label="??ang giao h??ng" {...a11yProps(2)} />
                            <Tab label="???? nh???n ???????c h??ng" {...a11yProps(3)} />
                            <Tab label="???? hu???" {...a11yProps(4)} />
                            <Tab label="Y??u c???u tr??? h??ng" {...a11yProps(4)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">M?? ho?? ????n</TableCell>
                                            <TableCell align="center">S??? l?????ng</TableCell>
                                            <TableCell align="center">Gi?? ti???n (VN??)</TableCell>
                                            <TableCell align="center">Ph?? v???n chuy???n (VN??)</TableCell>
                                            <TableCell align="center">T???ng ti???n (VN??)</TableCell>
                                            <TableCell align="center">Tr???ng th??i</TableCell>
                                            <TableCell align="center">Thanh to??n</TableCell>
                                            <TableCell align="center">Ng??y t???o ho?? ????n</TableCell>
                                            <TableCell align="center">Hu??? ????n</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {loading ? <Box sx={{
                                        left: 0,
                                        magin: 10,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}><CircularProgress /></Box>
                                        : <TableBody>
                                            {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <Row key={row.id} row={row} />
                                                ))}
                                        </TableBody>}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                component="div"
                                count={history.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">M?? ho?? ????n</TableCell>
                                            <TableCell align="center">S??? l?????ng</TableCell>
                                            <TableCell align="center">Gi?? ti???n (VN??)</TableCell>
                                            <TableCell align="center">Ph?? v???n chuy???n (VN??)</TableCell>
                                            <TableCell align="center">T???ng ti???n (VN??)</TableCell>
                                            <TableCell align="center">Tr???ng th??i</TableCell>
                                            <TableCell align="center">Thanh to??n</TableCell>

                                            <TableCell align="center">Ng??y t???o ho?? ????n</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {loading ? <Box sx={{
                                        left: 0,
                                        magin: 10,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}><CircularProgress /></Box>
                                        : <TableBody>
                                            {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <Row key={row.id} row={row} />
                                                ))}
                                        </TableBody>}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                component="div"
                                count={history.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>

                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">M?? ho?? ????n</TableCell>
                                            <TableCell align="center">S??? l?????ng</TableCell>
                                            <TableCell align="center">Gi?? ti???n (VN??)</TableCell>
                                            <TableCell align="center">Ph?? v???n chuy???n (VN??)</TableCell>
                                            <TableCell align="center">T???ng ti???n (VN??)</TableCell>
                                            <TableCell align="center">Tr???ng th??i</TableCell>
                                            <TableCell align="center">Thanh to??n</TableCell>

                                            <TableCell align="center">Ng??y t???o ho?? ????n</TableCell>
                                            <TableCell align="center">X??c nh???n ????n h??ng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {loading ? <Box sx={{
                                        left: 0,
                                        magin: 10,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}><CircularProgress /></Box>
                                        : <TableBody>
                                            {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <Row key={row.id} row={row} />
                                                ))}
                                        </TableBody>}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                component="div"
                                count={history.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>

                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">M?? ho?? ????n</TableCell>
                                            <TableCell align="center">S??? l?????ng</TableCell>
                                            <TableCell align="center">Gi?? ti???n (VN??)</TableCell>
                                            <TableCell align="center">Ph?? v???n chuy???n (VN??)</TableCell>
                                            <TableCell align="center">T???ng ti???n (VN??)</TableCell>
                                            <TableCell align="center">Tr???ng th??i</TableCell>
                                            <TableCell align="center">Thanh to??n</TableCell>

                                            <TableCell align="center">Ng??y t???o ho?? ????n</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {loading ? <Box sx={{
                                        left: 0,
                                        magin: 10,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}><CircularProgress /></Box>
                                        : <TableBody>
                                            {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <Row key={row.id} row={row} />
                                                ))}
                                        </TableBody>}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                component="div"
                                count={history.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>

                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">M?? ho?? ????n</TableCell>
                                            <TableCell align="center">S??? l?????ng</TableCell>
                                            <TableCell align="center">Gi?? ti???n (VN??)</TableCell>
                                            <TableCell align="center">Ph?? v???n chuy???n (VN??)</TableCell>
                                            <TableCell align="center">T???ng ti???n (VN??)</TableCell>
                                            <TableCell align="center">Tr???ng th??i</TableCell>
                                            <TableCell align="center">Thanh to??n</TableCell>

                                            <TableCell align="center">Ng??y t???o ho?? ????n</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {loading ? <Box sx={{
                                        left: 0,
                                        magin: 10,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}><CircularProgress /></Box>
                                        : <TableBody>
                                            {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <Row key={row.id} row={row} />
                                                ))}
                                        </TableBody>}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                component="div"
                                count={history.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">M?? ho?? ????n ho??n tr???</TableCell>
                                            <TableCell align="center">M?? ho?? ????n mua h??ng</TableCell>
                                            <TableCell align="center">S??? l?????ng</TableCell>
                                            <TableCell align="center">Gi?? ti???n (VN??)</TableCell>
                                            <TableCell align="center">L?? do tr??? h??ng</TableCell>
                                            <TableCell align="center">Tr???ng th??i</TableCell>
                                            <TableCell align="center">Ng??y t???o y??u c???u</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {loading ? <Box sx={{
                                        left: 0,
                                        magin: 10,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}><CircularProgress /></Box>
                                        : <TableBody>
                                            {historyReturn.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <RowReturn key={row.id} row={row} />
                                                ))}
                                        </TableBody>}
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                component="div"
                                count={history.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </TabPanel>
                </Box>
            </section>
        </div>
    )
}
export default OrderHistory2


