 
import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import api from '../../service/api'
import { API_KEY } from '../../service/api_key'
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchUrlImages } from '../../redux/actions'
 
export class Detail extends Component {
 
 //Inicializa variaveis e recebe props por parametro da pagina movies
 constructor(props) {
   super(props);
   this.state = {
     data: [],
     loading: true
   }
 }
 
 //Retorna o link das imagens que foi carregado e salvo no gerenciador REDUX. Também é chamado a função que carrega os detalhes
 componentDidMount() {
   this.props.fetchUrlImages
   this.fetchMovieDetail()
 }
 
 //Request para buscar os detalhes de um filme, utilizando o parametro "id" que é mandado na página movies e a API_KEY que está salva em outro arquivo
 //Após carregados o loding some da tela e os dados são apresentados
 fetchMovieDetail() {
   api.get('/movie/'+this.props.route.params.id+'?api_key='+API_KEY)
     .then(res => this.setState({ data: res.data, loading: false }))
     .catch(() => this.setState({ data: [], loading: false }))
 }
 
 //Função manual para formatar data de yyyy-mm-dd para dd/mm/yyyy
 //Solução otimizada para não precisar instalar plugin
 formatData(date) {
   var strSplitDate = date.split('-');
   const newDate =  strSplitDate[2] + '/' + strSplitDate[1] + '/' + strSplitDate[0];
   return newDate;
 }
  render() {
   return (
     <View style={styles.container}>
       {this.state.loading ? (
         <View style={styles.loading}>
           <ActivityIndicator size="large" />
         </View>
       ) : (
         <ScrollView>
           <View style={styles.details}>
             <Image style={styles.image} source={{ uri: this.props.imagesUrl+this.state.data.poster_path }} />
             <View style={styles.boxTitle}>
               <Text style={styles.title}>{this.state.data.title}</Text>
             </View>
           </View>
           <View style={styles.votes}>
             <View style={styles.voteAverage}>
               <Icon name='star' color='#ffc400' style={styles.icon} />
               <Text style={styles.voteText}>{this.state.data.vote_average}</Text>
             </View>
             <View style={styles.voteAverage}>
               <Icon name='heart' color='#ff0000' style={styles.icon} />
               <Text style={styles.voteText}>{this.state.data.vote_count}</Text>
             </View>
           </View>
           <View style={styles.overview}>
             <View style={styles.infos}>
               <Text style={styles.titleInfo}>Lançamento: </Text>
               <Text style={styles.genre}>{this.formatData(this.state.data.release_date)}</Text>
             </View>
             <View style={styles.infos}>
             <Text style={styles.titleInfo}>Generos: </Text>
               {this.state.data.genres.map((genre, i) => (
                 <Text key={genre.id} style={styles.genre}>{genre.name}{i < this.state.data.genres.length-1 ? '/' : ''}</Text>
               ))}
             </View>
             <View style={styles.infos}>
               <Text style={styles.titleInfo}>Idiomas: </Text>
               {this.state.data.spoken_languages.map((language, i) => (
                 <Text key={language.iso_639_1} style={styles.genre}>{language.name}{i < this.state.data.spoken_languages.length-1 ? '/' : ''}</Text>
               ))}
             </View>
             <Text style={styles.descripion}>{this.state.data.overview}</Text>
             <View style={styles.infosCompany}>
               {this.state.data.production_companies.map((company, i) => (
                 <Text key={company.id} >{company.name} {i < this.state.data.production_companies.length-1 ? '/' : ''}</Text>
               ))}
             </View>
           </View>
         </ScrollView>
       )}
     </View>
   );
 }
}
 
//Carregamentos do redux
const mapStateToProps = state => {
 return {
   loading: state.dataState.loading,
   imagesUrl: state.dataState.imagesUrl,
 }
};
 
const mapDispatchToProps = dispatch => (
 {
   fetchUrlImages: dispatch(fetchUrlImages())
 }
);
 
//Estilização utilizando StyleSheet do react native
const styles = StyleSheet.create({
 container: {
   flex: 1,
   marginVertical: 20,
 },
 details: {
   alignItems: 'center'
 },
 loading: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 image: {
   width: 300,
   height: 450,
   borderRadius: 4,
   borderWidth: 1,
   borderColor: "#20232a",
 },
 boxTitle: {
   paddingVertical: 20,
   alignItems: 'center',
 },
 title: {
   fontSize: 26,
   fontWeight: "bold",
   flexWrap: 'nowrap',
   textAlign: 'center'
 },
 overview: {
   paddingHorizontal: 5,
   fontSize: 18,
   paddingVertical: 15,
 },
 date: {
   fontSize: 16,
   fontWeight: 'bold'
 },
 voteText: {
   fontWeight: "bold",
   padding: 2,
   fontSize: 18
 },
 votes: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   justifyContent: 'space-evenly'
 },
 voteAverage: {
   alignItems: 'center'
 },
 icon: {
   fontSize: 30
 },
 infos: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   paddingVertical: 3,
 },
 infosCompany: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   paddingVertical: 20,
 },
 genre: {
   fontSize: 18
 },
 descripion: {
   fontSize: 18,
   paddingVertical: 10
 },
 titleInfo: {
   fontWeight: 'bold',
   fontSize: 18
 }
});
 
export default connect(mapStateToProps, mapDispatchToProps) (Detail)