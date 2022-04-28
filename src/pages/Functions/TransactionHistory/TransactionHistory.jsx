import React, {useEffect, useState} from "react";
import {
    userGetMyTransactionLogs,
    adminGetTransactionById, userWithdrawSaving, userGetInfo, userReturnLoan,
} from "../../../api/api_config";
import {Card, Modal, Table, Tag} from "antd";
import AnimatedPage from "../../../utils/AnimatedPage";
import {millisecondsToDate} from "../../../utils/DateTimeConverter";
import {useStateIfMounted} from "use-state-if-mounted";
import {useHistory} from "react-router-dom";

const TransactionHistory = (object) => {
    const {id, isSessionExpired, type} = object.object
    const [page, setPage] = useStateIfMounted(0);
    const [size, setSize] = useStateIfMounted(5);
    const [total, setTotal] = useStateIfMounted(0)
    const [transactionList, setTransactionList] = useStateIfMounted([])
    const [isLoading, setIsLoading] = useState(true)

    const SORT_TYPE = "id,asc"
    const TYPE = ""

    const history = useHistory()
    useEffect(() => {
        getPaginationData().then()
    }, [page])

    const getPaginationData = async () => {
        setIsLoading(true)
        try {
            let res;
            if (id) {
                res = await adminGetTransactionById({
                    id: id,
                    page: page,
                    size: size,
                    sortBy: SORT_TYPE,
                    type: type ? type : TYPE,
                })
            } else {
                res = await userGetMyTransactionLogs({
                    page: page,
                    size: size,
                    sortBy: SORT_TYPE,
                    type: type ? type : TYPE,
                })
            }
            const json = await res.json();
            setTransactionList(json.data.content);
            setTotal(json.data.totalElements);
        } catch (TypeError) {
            Modal.error(
                {
                    title: "Login session expired",
                    content: "Please login again",
                    onOk: () => {
                        isSessionExpired.set(true)
                    }
                },)
        } finally {
            setIsLoading(false)
        }

    }

    const onWithdrawSaving = async (record) => {
        Modal.confirm({
            title: "Are you sure want to withdraw?", onOk: async () => {
                try {
                    const res = await userWithdrawSaving({
                        id: record.saving.id
                    })
                    if (!res.ok) Modal.error({title: "Oops", content: (await res.json()).message})
                    else Modal.success({title: "Delete successfully"})
                } catch (e) {
                    Modal.error(
                        {
                            title: "Login session expired",
                            content: "Please login again",
                            onOk: () => {
                                isSessionExpired.set(true)
                            }
                        },)
                } finally {
                    await getPaginationData()
                    await userGetInfo()
                }
            }
        })
    }

    const onReturnLoan = (record) => {
        Modal.confirm({
            title: "Are you sure want to return loan?", onOk: async () => {
                try {
                    const res = await userReturnLoan({
                        id: record.loan.id
                    })
                    if (!res.ok) Modal.error({title: "Oops", content: (await res.json()).message})
                    else Modal.success({title: "Return loan successfully"})
                } catch (e) {
                    Modal.error(
                        {
                            title: "Login session expired",
                            content: "Please login again",
                            onOk: () => {
                                isSessionExpired.set(true)
                            }
                        },)
                } finally {
                    await getPaginationData()
                    await userGetInfo()
                }
            }
        })
    }


    const childStyle = {display: "flex", flexDirection: "row", alignItems: "center", fontSize: "1.0rem"}


    return (
        <AnimatedPage>
            <Card headStyle={{textAlign: "center", fontWeight: "bold"}} title="Transaction History" bordered={false}
                  style={{width: "100%"}}>
                <Table
                    loading={isLoading}
                    rowKey={"id"}
                    columnWidth={30}
                    pagination={{
                        simple: true,
                        pageSize: size,
                        total: total,
                        position: ['bottomCenter'],
                        onChange: (e) => setPage(e - 1)
                    }}
                    columns={[
                        {
                            title: "Transaction",
                            dataIndex: "amount",
                            key: "amount",
                            render: (text, record) => {
                                let component = (<div></div>)
                                if (record.transactionType === "withdraw") component = (
                                    <div style={childStyle}><p>Withdraw </p><p style={{
                                        color: 'red',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceBefore - record.balanceAfter).toFixed(2)}&nbsp;</p><p>from
                                        your account</p>
                                    </div>)
                                if (record.transactionType === "deposit") component = (
                                    <div style={childStyle}><p>Deposit</p><p style={{
                                        color: 'green',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceAfter - record.balanceBefore).toFixed(2)}&nbsp;</p><p> to
                                        your account</p></div>)
                                if (record.transactionType === "send_transfer") component = (<div style={childStyle}>
                                    <p>Sent </p><p style={{
                                    color: 'red',
                                    fontWeight: "bold"
                                }}>&nbsp;${(record.balanceBefore - record.balanceAfter).toFixed(2)}&nbsp;</p>
                                    <p> to {record.fromTransfer.toAccount.lastName} {record.fromTransfer.toAccount.firstName} ({record.fromTransfer.toAccount.phoneNo})
                                    </p>
                                </div>)
                                if (record.transactionType === "receive_transfer") component = (
                                    <div style={childStyle}><p>Received</p><p style={{
                                        color: 'green',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceAfter - record.balanceBefore).toFixed(2)}&nbsp;</p>
                                        <p> from {record.toTransfer.fromAccount.lastName} {record.toTransfer.fromAccount.firstName} ({record.toTransfer.fromAccount.phoneNo})
                                        </p></div>)
                                if (record.transactionType === "start_saving") component = (
                                    <div style={childStyle}><p>Created a saving with amount</p><p style={{
                                        color: 'red',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceBefore - record.balanceAfter).toFixed(2)}&nbsp;</p>
                                        <p> with
                                            duration {millisecondsToDate(record.saving.endTime - record.saving.startTime)} days
                                        </p>{record.saving.status === "completed" ?
                                            <p style={{color: 'green'}}>&nbsp;[COMPLETED]</p> :
                                            <p><a onClick={() => onWithdrawSaving(record)}>&nbsp;(Withdraw)</a></p>}
                                    </div>)
                                if (record.transactionType === "start_loan") component = (
                                    <div style={childStyle}><p>Created a loan with amount</p><p style={{
                                        color: 'green',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceAfter - record.balanceBefore).toFixed(2)}&nbsp;</p><p>with
                                        duration {millisecondsToDate(record.loan.endTime - record.loan.startTime)}</p>
                                        {record.loan.status === "completed" ?
                                        <p style={{color: 'green'}}>&nbsp;[COMPLETED]</p> :
                                        <p><a onClick={() => onReturnLoan(record)}>&nbsp;(Return loan)</a></p>}
                                    </div>)
                                if (record.transactionType === "withdraw_saving") component = (
                                    <div style={childStyle}><p>Withdrew saving with amount</p><p style={{
                                        color: 'green',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceAfter - record.balanceBefore).toFixed(2)}&nbsp;</p>
                                        <p style={{color: 'green'}}>&nbsp;[COMPLETED]</p>
                                    </div>)
                                if (record.transactionType === "return_loan") component = (
                                    <div style={childStyle}><p>Returned loan with amount</p><p style={{
                                        color: 'green',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceBefore - record.balanceAfter).toFixed(2)}&nbsp;</p>
                                        <p style={{color: 'green'}}>&nbsp;[COMPLETED]</p>
                                    </div>)
                                return <>{component}</>
                            }
                        },
                        {
                            title: 'Type',
                            dataIndex: 'transactionType',
                            key: 'transactionType',
                            render: (text) => {
                                let color
                                let newText = text
                                if (text === "send_transfer" || text === "start_saving" || text === "withdraw" || text === "withdraw_saving") {
                                    color = "red"
                                    if (text === "send_transfer") newText = "Send"
                                    if (text === "start_saving") newText = "Saving"
                                    if (text === "withdraw_saving") newText = "Completed saving"
                                }
                                if (text === "receive_transfer" || text === "start_loan" || text === "deposit" || text === "return_loan") {
                                    color = "green"
                                    if (text === "receive_transfer") newText = "Received"
                                    if (text === "start_loan") newText = "Loan"
                                    if (text === "return_loan") newText = "Completed Loan"
                                }
                                return (<Tag color={color} key={text}>
                                    {newText.toUpperCase()}
                                </Tag>)
                            }
                        },
                    ]}
                    dataSource={transactionList}/>
            </Card>
        </AnimatedPage>
    );
}

export default TransactionHistory