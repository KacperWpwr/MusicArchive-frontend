import api_path from "../api_path";

export async function getSongs(){
    return await fetch(api_path+'songs')
}

export async function deleteSong(id){
    return await fetch(api_path+'songs/'+id,{
        method:'DELETE'
    })
}