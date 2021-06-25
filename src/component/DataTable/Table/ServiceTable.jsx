import React, {useState } from 'react'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import TableHeader from '../TableHeader/TableHeader'
import { useHistory } from 'react-router'
import { notify } from '../../../common/Toast/ToastNotification'
import { deleteToastMessage } from '../../../common/Toast/ToastMessages'
import Confirmation from '../../Modal/Confirmation/Confirmation'
import { useObserver } from 'mobx-react'



const ServiceTable = ({ headers,servicesContext}) => {


    const [showConfirmationModel, setShowConfirmationModel] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const history = useHistory();

    const deleteHanlder = (id) => {
        servicesContext.removeService(id);
        setShowConfirmationModel(false);
        notify(deleteToastMessage);
    }
  
    return useObserver(() => (<div>
        <Confirmation show={showConfirmationModel}
            onHide={() => setShowConfirmationModel(false)}
            onSubmit={() =>
                deleteHanlder(deleteId)} />
        <table className="table">
            <TableHeader headers={headers} onSorting={(field, order) => {
               servicesContext.setSorting(field,order)
            }} />
            <tbody>
                {servicesContext.services.map((data) => (
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
    </div>));
}
export default ServiceTable;