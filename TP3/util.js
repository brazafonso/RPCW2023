exports.count_sexes = function(pessoas){
  sex_frequency = {}
  for(key in pessoas){
    pessoa = pessoas[key]
    if(!(pessoa.sexo in sex_frequency)){
      sex_frequency[pessoa.sexo] = 0
    }
    sex_frequency[pessoa.sexo] += 1
  }
  return Object.keys(sex_frequency).map(function(key) {
    return [key, sex_frequency[key]];
  });
}

exports.count_sports = function(pessoas){
  sport_frequency = {}
  for(key in pessoas){
    pessoa = pessoas[key]
    for(let i = 0; i < pessoa.desportos.length; i++){
      sport = pessoa.desportos[i]
      if(!(sport in sport_frequency)){
        sport_frequency[sport] = 0
      }
      sport_frequency[sport] += 1
   }
  }
  return Object.keys(sport_frequency).map(function(key) {
    return [key, sport_frequency[key]];
  });
}

exports.filter_sport = function(pessoas,sport){
  new_pessoas = []
  for(pessoa in pessoas){
    if(pessoas[pessoa].desportos.includes(sport)){
      new_pessoas.push(pessoas[pessoa])
    }
  }
  return new_pessoas
}

exports.count_professions = function(pessoas){
  profession_frequency = {}
  for(key in pessoas){
    pessoa = pessoas[key]
    profissao = pessoa.profissao
    if(!(profissao in profession_frequency)){
      profession_frequency[profissao] = 0
    }
    profession_frequency[profissao] += 1
  }
  return Object.keys(profession_frequency).map(function(key) {
    return [key, profession_frequency[key]];
  });
}