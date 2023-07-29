import {addProceso} from "@/data/proceso"

export const createLog = async (toast,equipoID, mascotaIDs,
                                tiempoEjec,operarioID) => {

          
const response = await  addProceso({
  tiempoEjecucion:tiempoEjec,
  mascota1:mascotaIDs[0].id,
  mascota2:mascotaIDs[1]?.id,
  equipo:equipoID,
  operario:operarioID
})

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
