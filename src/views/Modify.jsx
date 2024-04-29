
import {useMedia} from '../hooks/ApiHooks';
import useForm from '../hooks/formHooks';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../components/UI/Button';
import { useEffect} from 'react';

const Modify = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const {getMediaById, putMedia} = useMedia();

  const getItem = async () => {
    const itemResult = await getMediaById(id);
    console.log('itemResult', itemResult);
    setInputs({title: itemResult.title, description: itemResult.description});
  };
  useEffect(() => {  getItem();
  }, []);

  const initValues = {
    title: '',
    description: '',
  };

  const doModify = async () => {
    try {
      const token = localStorage.getItem('token');
      // TODO: call postMedia function (see below)
      const mediaResponse = await putMedia(id, inputs, token);
      if (mediaResponse) {
        console.log(mediaResponse);
      }
      // TODO: redirect to Home
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, setInputs,handleInputChange, handleSubmit} = useForm(
    doModify,
    initValues,
  );


  return (
    <>
      <h1>Modify</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            defaultValue={inputs?.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            defaultValue={inputs?.description}

          ></textarea>
        </div>
        {/* <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        /> */}
        <Button type="submit" text="Modify"/>
      </form>
    </>
  );
};


export default Modify;
