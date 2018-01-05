import{Component, OnInit} from '/angular'

@Component({
    selector: 'rxjs-tutorial',
    templateUrl: './rxjs-tutorial.component.html',
    styleurls:['./rxjs-tutorial.component.css']
})
export class RxjsTutorialComponent implements OnInit{

    constructor(){}
    ngOnInit(){
        let button = document.querySelector('button');
        button.addEventListener('click', () => console.log('yo,bro, clicked me'))
    }

}
