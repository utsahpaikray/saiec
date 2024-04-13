import { Component } from '@angular/core';
import { story } from './story';
interface Celebration {
  top: number;
  left: number;
  active: boolean;
  emoji: unknown
}
@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./storypage.scss']
})
export class storyPage {

public story =story

}
