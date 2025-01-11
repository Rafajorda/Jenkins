import { useState } from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';
import fetch from 'node-fetch';

export const GifExpertApp = () => {

    const [categories, setCategories] = useState([ 'software' ]);

    const onAddCategory = (newCategory) => {
        if( categories.includes(newCategory) ) return;
        setCategories([ newCategory, ...categories ]);
    };

  return (
    <>
        <h1>GifExpertApp</h1>
        <AddCategory 
            onNewCategory={ onAddCategory }
        />
        {
            categories.map( category => (
                <GifGrid 
                    key={ category }
                    category={ category } />
            ))
        }
    </>
  )
}
