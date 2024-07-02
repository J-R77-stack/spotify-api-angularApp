import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistplaylistComponent } from './artistplaylist.component';

describe('ArtistplaylistComponent', () => {
  let component: ArtistplaylistComponent;
  let fixture: ComponentFixture<ArtistplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistplaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
