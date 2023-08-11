import {addProceso, DeleteProceso} from "@/data/proceso"
import {getUser} from "@/data/login"
import {findMascota} from "@/data/pet"
import {enviarEmail} from "@/data/email"



export const sendEmailUser = async (to) => {
  try {
    if (to === null || typeof to === 'undefined') {
      throw new Error('Email address cannot be null or undefined');
    }

    await enviarEmail({
      to: to,
      subject: 'Termino proceso',
      html: '<h1>La mascota termino su proceso"</h1>',
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendEmailCliente = async (to) => {
  try {
    await enviarEmail({
      to: to,
      subject: 'Estado de mascota',
      html: '<h1>Hola, su mascota se encuentra en estado "Para entrega" !</h1>',
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


export const createLog = async (toast,equipoID, mascotaIDs,
                                tiempoEjec,userID) => {

    console.log("validando campos",equipoID, mascotaIDs,
      tiempoEjec,userID)  
  

          
const response = await  addProceso({
  tiempoEjecucion:tiempoEjec,
  mascota1:mascotaIDs[0].id,
  mascota2:mascotaIDs[1]?.id,
  equipo:equipoID,
  user:userID
})
const user = await getUser(userID)
const mascota1 = await findMascota(mascotaIDs[0].id)
const mascota2 = await findMascota(mascotaIDs[1].id)


//console.log("email usuario",user.data.email)
//console.log("email cliente",mascota1.data.dueñoEmail)


//Enviar emails 
sendEmailUser(user.data.email)
sendEmailCliente(mascota1.data.dueñoEmail)
sendEmailCliente(mascota2.data.dueñoEmail)


if(response.status == 200){
  toast({
    title: "¡Proceso terminado!",
    description: 'Se ha creado un log del proceso.',
    status: "success",
    duration: 2000,
    isClosable: true
  })
}else{
  toast({
    title: "Error",
    description: 'Hubo un error al terminar el proceso',
    status: "warning",
    duration: 2000,
    isClosable: true
  })
}}

export const deleteLog = async (toast,procesoID) => {


  const response = await  DeleteProceso(procesoID)



if(response.status == 200){
toast({
title: "¡Proceso eliminado!",
description: 'Se ha eliminado el log del proceso correctamente.',
status: "success",
duration: 2000,
isClosable: true
})
}else{
toast({
title: "Error",
description: 'Hubo un error al intentar eliminar el log',
status: "warning",
duration: 2000,
isClosable: true
})
}}
