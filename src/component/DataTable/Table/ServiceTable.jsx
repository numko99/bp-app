import React, { useContext, useState } from 'react'
import { ServiceContext } from '../../../store/Services/ServicesContext'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import TableHeader from '../TableHeader/TableHeader'
import { useHistory } from 'react-router'
import { notify } from '../../../common/Toast/ToastNotification'
import { deleteToastMessage } from '../../../common/Toast/ToastMessages'
import Confirmation from '../../Modal/Confirmation/Confirmation'


const ServiceTable = ({ headers}) => {

    const list= useContext(ServiceContext);
    const [showConfirmationModel, setShowConfirmationModel] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const history = useHistory();

    const deleteHanlder = (id) => {
        list.delete(id);
        setShowConfirmationModel(false);
        notify(deleteToastMessage);
    }


    return (<div>
        <Confirmation show={showConfirmationModel}
            onHide={() => setShowConfirmationModel(false)}
            onSubmit={() =>
                deleteHanlder(deleteId)} />
        <table className="table">
            <TableHeader headers={headers} onSorting={(field, order, type) => {
                list.sorting[1]({ field, order, type })
            }} />
            <tbody>
                {list.services.map((data) => (

                    <tr key={data.Id}>
                        <td>{data.Name}</td>
                        <td>{data.Code}</td>
                        <td>{data.Price}</td>
                        <td>{data.Duration}</td>
                        <td>
                            <a className="btn text-primary">
                                <i onClick={() => history.push("/EditService/" + data.Id)}><PencilSquare /></i>
                            </a>
                            <a className="btn text-danger"><i onClick={() => {
                                setShowConfirmationModel(true)
                                setDeleteId(data.Id)
                            }}><Trash /></i></a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}
export default ServiceTable;