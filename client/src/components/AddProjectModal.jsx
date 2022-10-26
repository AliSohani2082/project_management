import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQueries'

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState('new');
  
  //Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS)
  
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: {addProject } }) {
      const {projects} = cache.readQuery(GET_PROJECTS);
      cache.writeQuery({
        query: GET_PROJECTS,
        data: [...projects, addProject],
      })
    }
  })
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(name === '' || status === '' || clientId === '') return alert('Please fill in all fields')

    addProject(name, description, clientId, status)
    setName('')
    setDescription('')
    setStatus('new')
    setClientId('')
  }

  if(loading) return null;
  if(error) return "Something went wrong";


  return (
    <>
      {!loading && !error && (
        <div>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center">
              <FaList className='icon'/>
              <div>New Project</div>
            </div>
          </button>

          <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModal Label" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModal Label">New Project</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className='form-label'>name</label>
                      <input type="text" className="form-control" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className='form-label'>description</label>
                      <textarea className="form-control" id='description' value={description} onChange={(e) => setDescription(e.target.value)}>

                      </textarea>
                    </div>
                    <div className="mb-3">
                      <label className='form-label'>Status</label>
                      <select className='form-select' id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select className='form-select' id='clientId' value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                      </select>
                    </div>
                    <button type='submit' data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddClientModal