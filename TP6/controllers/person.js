var Person = require('../models/person')
// Person list
module.exports.list = () => {
    return Person.peopleModel
    .find()
    .sort({nome:1})
        .then(docs => {
            return docs
        })
        .catch( error => {
            return error
        }
        )
}

module.exports.getPerson = id => {
    return Person.peopleModel
    .findOne({'id':id})
        .then(Person => {
            return Person
        })
        .catch( error => {
            return error
        }
        )
}

module.exports.addPerson = p => {
    person = {
        "nome" : p.nome,
        "idade" : p.idade,
        "sexo" : p.sexo,
        "morada" : {
            "cidade" : p.cidade,
            "distrito" : p.distrito
        },
        "BI" : p.BI,
        "profissao" : p.profissao,
        "partido_politico": {
            "party_abbr": p.party_abbr,
            "party_name": p.party_name
          },
          "religiao": p.religiao,
          "desportos": p['desportos']?p['desportos'].split(";") : [],
          "animais": p['animais']?p['animais'].split(';') : [],
          "figura_publica_pt": p['figura_publica_pt']?p['figura_publica_pt'].split(";") : [],
          "marca_carro": p.marca_carro,
          "destinos_favoritos": p['destinos']?p['destinos'].split(';') : [],
          "atributos": {
            "fumador": 'fumador' in p,
            "gosta_cinema": 'gosta_cinema' in p,
            "gosta_viajar": 'gosta_viajar' in p,
            "acorda_cedo": 'acorda_cedo' in p,
            "gosta_ler": 'gosta_ler' in p,
            "gosta_musica": 'gosta_musica' in p,
            "gosta_comer": 'gosta_comer' in p,
            "gosta_animais_estimacao": 'gosta_animais_estimacao' in p,
            "gosta_dancar": 'gosta_dancar' in p,
            "comida_favorita": ('comida_favorita' in p)? p.comida_favorita : ''
          },
          "id": p.id
    }
    return Person.peopleModel
    .find({'id':p.id})
    .then(res=>{
        if(len(res) > 0)
            Person.peopleModel.create(person)
            .then(res => {
                return res
            })
            .catch( error => {
                return error
            }
            ) 
        else return 'Person already exists'
    })
    .catch( error => {
        return error
    }
    ) 

    
}

module.exports.updatePerson = p => {
    person = {
        "nome" : p.nome,
        "idade" : p.idade,
        "sexo" : p.sexo,
        "morada" : {
            "cidade" : p.cidade,
            "distrito" : p.distrito
        },
        "BI" : p.BI,
        "profissao" : p.profissao,
        "partido_politico": {
            "party_abbr": p.party_abbr,
            "party_name": p.party_name
          },
          "religiao": p.religiao,
          "desportos": p['desportos']?p['desportos'].split(";") : [],
          "animais": p['animais']?p['animais'].split(';') : [],
          "figura_publica_pt": p['figura_publica_pt']?p['figura_publica_pt'].split(";") : [],
          "marca_carro": p.marca_carro,
          "destinos_favoritos": p['destinos']?p['destinos'].split(';') : [],
          "atributos": {
            "fumador": 'fumador' in p,
            "gosta_cinema": 'gosta_cinema' in p,
            "gosta_viajar": 'gosta_viajar' in p,
            "acorda_cedo": 'acorda_cedo' in p,
            "gosta_ler": 'gosta_ler' in p,
            "gosta_musica": 'gosta_musica' in p,
            "gosta_comer": 'gosta_comer' in p,
            "gosta_animais_estimacao": 'gosta_animais_estimacao' in p,
            "gosta_dancar": 'gosta_dancar' in p,
            "comida_favorita": ('comida_favorita' in p)? p.comida_favorita : ''
          },
          "id": p.id
    }
    return Person.peopleModel
    .updateOne({id:person.id},person)
        .then(res => {
            return person
        })
        .catch( error => {
            return error
        }
        )  
}

module.exports.deletePerson = id => {
    return Person.peopleModel
    .deleteOne({id:id})
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}


module.exports.formatPerson = p =>{
    return new_p = {
        "nome" : p.nome,
        "idade" : p.idade,
        "sexo" : p.sexo,
        "morada" : p.morada,
        "BI" : p.BI,
        "profissao" : p.profissao,
        "partido_politico": p.partido_politico,
          "religiao": p.religiao,
          "desportos": p['desportos']?p['desportos'].join(";") : '',
          "animais": p['animais']?p['animais'].join(';') : '',
          "figura_publica_pt": p['figura_publica_pt']?p['figura_publica_pt'].join(";") : '',
          "marca_carro": p.marca_carro,
          "destinos_favoritos": p['destinos']?p['destinos'].join(';') : '',
          "atributos": p.atributos,
          "id": p.id
    }

}