import React, {useEffect, useState} from "react";
import {
    getMyTransactionHistory,
    getTransactionsById,
} from "../../../api/api_config";
import {Card, Modal, Table, Tag} from "antd";
import AnimatedPage from "../../../utils/AnimatedPage";
import {millisecondsToDate} from "../../../utils/DateTimeConverter";
import {useStateIfMounted} from "use-state-if-mounted";
import {useHistory} from "react-router-dom";

const TransactionHistory = (object) => {
    const {id, isSessionExpired} = object.object
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
                res = await getTransactionsById({
                    id: id,
                    page: page,
                    size: size,
                    sortBy: SORT_TYPE,
                    type: TYPE,
                })
            } else {
                res = await getMyTransactionHistory({
                    page: page,
                    size: size,
                    sortBy: SORT_TYPE,
                    type: TYPE,
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
                                    }}>&nbsp;${(record.balanceBefore - record.balanceAfter).toFixed(2)}&nbsp;</p><p>from your account</p>
                                    </div>)
                                if (record.transactionType === "deposit") component = (
                                    <div style={childStyle}><p>Deposit</p><p style={{
                                        color: 'green',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceAfter - record.balanceBefore).toFixed(2)}&nbsp;</p><p> to your account</p></div>)
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
                                    }}>&nbsp;${(record.balanceBefore - record.balanceAfter).toFixed(2)}&nbsp;</p><p> with
                                        duration {millisecondsToDate(record.saving.endTime - record.saving.startTime)} days
                                    </p></div>)
                                if (record.transactionType === "start_loan") component = (
                                    <div style={childStyle}><p>Created a loan with amount</p><p style={{
                                        color: 'green',
                                        fontWeight: "bold"
                                    }}>&nbsp;${(record.balanceAfter - record.balanceBefore).toFixed(2)}&nbsp;</p><p>with
                                        duration {millisecondsToDate(record.loan.endTime - record.loan.startTime)}</p>
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
                                if (text === "send_transfer" || text === "start_saving" || text === "withdraw") {
                                    color = "red"
                                    if (text === "send_transfer") newText = "Send"
                                    if (text === "start_saving") newText = "Saving"
                                }
                                if (text === "receive_transfer" || text === "start_loan" || text === "deposit") {
                                    color = "green"
                                    if (text === "receive_transfer") newText = "Received"
                                    if (text === "start_loan") newText = "Loan"
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