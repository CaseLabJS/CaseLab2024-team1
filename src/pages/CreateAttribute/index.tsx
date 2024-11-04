import React, { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Grid2 from '@mui/material/Grid2';

interface Attribute {
  documentTypesNames: string[];
  name: string;
  required: boolean;
}

const CreateAttributePage: React.FC = () => {
  const [attribute, setAttribute] = useState<Attribute>({
    documentTypesNames: [],
    name: '',
    required: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countAttributeTypes, setCountAttributeTypes] = useState<number>(3);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type} = e.target;
    if (name.startsWith('documentTypesNames')) {
      setAttribute((prev)=>{
        console.log(name, value, type);
        const index = parseInt(name.replace('documentTypesNames', ''), 10);
        const newDocumentTypesNames = [...prev.documentTypesNames];
        newDocumentTypesNames[index] = value;
        return {
          ...prev,
          documentTypesNames: newDocumentTypesNames,
        }
      });
    } else {
      setAttribute((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
    console.log(attribute);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/attributes', attribute);
      setSuccess('Атрибут успешно создан!');
      setError(null);
      console.log(response.data);
    } catch (error) {
      setError(`Ошибка при создании атрибута->${error}. Попробуйте еще раз.`);
      setSuccess(null);
    }
  };

  const printHtmlDocumentTypesNames = (count:number=1) => {
    const htmlElementsArray = [];
    for (let i = 0; i < count; i++) {
      htmlElementsArray.push(
        <Grid2 key={i}>
          <label htmlFor={`documentTypesNames${i}`}>{`${i+1}) Тип документа `}</label>
          <input
            type="text"
            id={`documentTypesNames${i}`}
            name={`documentTypesNames${i}`}
            value={attribute.documentTypesNames[i] || ''}
            onChange={handleChange}
          />
          {i !==0 && <button onClick={deleteDocumentTypesNames(i)}><DeleteIcon/></button>}
        </Grid2>
      );
    }
    return htmlElementsArray.map((element) => (element));
  }

  const deleteDocumentTypesNames = (index: number) => (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAttribute((prev) =>{
      const newDocumentTypesNames = prev.documentTypesNames.filter((_, i)=> i !== index);
      return{
        ...prev,
        documentTypesNames: newDocumentTypesNames,
      };
    });
    setCountAttributeTypes(countAttributeTypes-1);
  }

  const addDocumentTypesNames = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCountAttributeTypes(countAttributeTypes+1);
  }

  return (
    <Grid2>
      <h1>Создание атрибута</h1>
      <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2}
             direction="column"
             alignItems="center"
             bgcolor="bisque"
             padding="15px"
             justifyContent="center">
        <Grid2>
          <label htmlFor="name">Название атрибута</label>
        </Grid2>

        <Grid2>
          <input id="name" name="name" value={attribute.name} onChange={handleChange}/>
        </Grid2>
        {printHtmlDocumentTypesNames(countAttributeTypes)}
        <Grid2>
          <button onClick={addDocumentTypesNames}><AddCircleOutlineIcon/></button>
        </Grid2>
        <Grid2>
          <label htmlFor="required">Обязательный</label>
          <input
            type="checkbox"
            id="required"
            name="required"
            checked={attribute.required}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2>
          <button type="submit">Создать атрибут</button>
        </Grid2>
      </Grid2>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </Grid2>
  );
};

export default CreateAttributePage