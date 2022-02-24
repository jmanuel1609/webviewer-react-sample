import React, { useState, useEffect } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Button, Modal, Header} from "semantic-ui-react"
import PdfView from './PdfView'
const App = () => {

  const [open, setOpen] =useState(false)


  function openViewer(){
    setOpen(true);
  }

  function closeViewer(){
    setOpen(false);
  }

  // if using a class, equivalent of componentDidMount


  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className={"btnContainer"}>
        <Button onClick={openViewer} primary>
          Open pdf
        </Button>
      </div>
      {open && <Modal open={open} onClose={closeViewer}>
        <Header  content='Asset viewer' />
        <Modal.Content>
            <PdfView/>
        </Modal.Content>
      </Modal> }
    </div>
  );
};

export default App;
