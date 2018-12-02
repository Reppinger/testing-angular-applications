import {DebugElement} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Contact, ContactService, FavoriteIconDirective, InvalidPhoneNumberModalComponent, InvalidEmailModalComponent} from '../shared';
import {AppMaterialModule} from '../../app.material.module';
import {ContactEditComponent} from './contact-edit.component';
import '../../../material-app-theme.scss';


describe('ContactEditComponent tests', () => {
    let fixture: ComponentFixture<ContactEditComponent>;
    let component: ContactEditComponent;
    let contactService: ContactService;
    let rootElement: DebugElement;
    const contactServiceStub = {
        contact: {
            id: 1,
            name: 'janet'
        },
        save: async function (contact: Contact) {
            component.contact = contact;
        },
        getContact: async function () {
            component.contact = this.contact;
            return this.contact;
        },
        updateContact: async function (contact: Contact) {
            component.contact = contact;
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ContactEditComponent, FavoriteIconDirective,
                InvalidEmailModalComponent, InvalidPhoneNumberModalComponent],
            imports: [
                AppMaterialModule,
                FormsModule,
                NoopAnimationsModule,
                RouterTestingModule
            ],
            providers: [{provide: ContactService, useValue: contactServiceStub}]
        });
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
            }
        });
        contactService = TestBed.get(ContactService);
    });
    beforeEach(() => {
            fixture = TestBed.createComponent(ContactEditComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            rootElement = fixture.debugElement;
        }
    );

    describe('saveContact() test', () => {
        it('should cause contact name display', fakeAsync(() => {
            const contact = {
                id: 1,
                name: 'lorace'
            };
            component.isLoading = false;
            component.saveContact(contact);
            fixture.detectChanges();
            const nameInput = rootElement.query(By.css('.contact-name'));
            tick();
            expect(nameInput.nativeElement.value).toBe('lorace');
        }));
    });

});
