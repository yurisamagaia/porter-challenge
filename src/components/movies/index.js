import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button, ActivityIndicator, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../service/api'
import { API_KEY } from '../../service/api_key'
import { fetchUrlImages } from '../../redux/actions'
 
export class Movies extends Component {
 
 //Inicializa variáveis
 constructor() {
   super();
   this.state = {
     data: [],
     page: 1,
     loading: true
   }
 }
 
 //Retorna o link das imagens que foi carregado e salvo no gerenciador REDUX. Também é chamado a função que carrega os filmes
 componentDidMount() {
   this.props.fetchUrlImages
   this.fetchMovies()
 }
 
 //Request para buscar os filmes, utilizando o parametro "page" que é carregado no construtor e a API_KEY que está salva em outro arquivo
 //Após carregados o loading some da tela e os dados são apresentados
 fetchMovies() {
   api.get('/movie/upcoming?page='+this.state.page+'&language=pt-BR&api_key='+API_KEY)
     .then(res => this.setState({ data: res.data.results, loading: false }))
     .catch(() => this.setState({ data: [], loading: false }))
 }
 
 //Página próxima. Se a página atual for menor que 1000, os dados são limpos e apresenta loading na tela até que os dados da próxima página sejam carregados
 next() {
   if (this.state.page < 1000)
   this.setState({ data: [], loading: true })
   this.state.page++
   this.fetchMovies()
 }
 
 //Página anterior. Se a pagina atual for maior que 1, os dados são limpos e apresenta loading na tela até que os dados da página anterior sejam carregados
 prev() {
   if (this.state.page > 1)
   this.setState({ data: [], loading: true })
   this.state.page--
   this.fetchMovies()
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
     <View style={styles.container} >
       {this.state.loading ? (
         <View style={styles.loading}>
           <ActivityIndicator size="large" />
         </View>
       ) : (
         <ScrollView>
           <View style={styles.boxItems}>
             {this.state.data.map(movie => (
               <View key={movie.id} style={styles.items}>
                 <Image style={styles.image} source={{ uri: this.props.imagesUrl+movie.poster_path }} />
                 <Text style={styles.title}>{movie.title.length > 13 ? movie.title.substring(0, 11)+'...' : movie.title}</Text>
                 <Text style={styles.date}>({this.formatData(movie.release_date)})</Text>
                 <View style={styles.votes}>
                   <View style={styles.voteAverage}>
                     <Icon name='star' color='#ffc400' style={styles.icon} />
                     <Text style={styles.voteText}>{movie.vote_average}</Text>
                   </View>
                   <View style={styles.voteAverage}>
                     <Icon name='heart' color='#ff0000' style={styles.icon} />
                     <Text style={styles.voteText}>{movie.vote_count}</Text>
                   </View>
                 </View>
                 <Button
                   title="Detalhes"
                   color="#E1071F"
                   accessibilityLabel="Detalhes"
                   onPress={() => this.props.navigation.navigate('detail', { id: movie.id }) }
                 />
               </View>
             ))}
           </View>
           <View style={styles.buttons}>
             <Button
               title="Anterior"
               color="#000"
               accessibilityLabel="Página anterior"
               onPress={() => {
                 this.prev();
               }}
             />
             <Button
               title="Proximo"
               color="#000"
               accessibilityLabel="Página próxima"
               onPress={() => {
                 this.next();
               }}
             />
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
   marginVertical: 20
 },
 boxItems: {
   flex: 1,
   flexDirection: 'row',
   flexWrap: 'wrap',
   justifyContent: 'space-evenly'
 },
 items: {
   paddingVertical: 10,
   width: 160,
   marginHorizontal: 10
 },
 loading: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 image: {
   width: 160,
   height: 240,
   borderRadius: 4,
   borderWidth: 1,
   borderColor: "#20232a",
 },
 title: {
   fontSize: 20,
   fontWeight: "bold",
   flexWrap: 'nowrap'
 },
 date: {
   fontSize: 13
 },
 voteAverage: {
   flexDirection: 'row',
   alignItems: 'center'
 },
 voteText: {
   fontWeight: "bold",
   padding: 2
 },
 votes: {
   flexDirection: 'row',
   justifyContent: 'space-between'
 },
 icon: {
   fontSize: 20
 },
 buttons: {
   flexDirection: 'row',
   justifyContent: 'space-evenly',
 }
});
 
export default connect(mapStateToProps, mapDispatchToProps) (Movies)
