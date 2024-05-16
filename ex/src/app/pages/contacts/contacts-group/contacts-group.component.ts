import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { Contact } from '../contacts.model'
import { AdrProperty, EmailProperty, FNProperty, IntegerType, OrgProperty, ParameterValueType, PrefParameter, SpecialValueType, TelProperty, TextType, TypeParameter, URIType, VCARD, ValueParameter } from 'vcard4'

interface VCardProps {
  name: string,
  emails: string[],
  addresses: string[],
  telephones: string[],
  organization: string
}

const createVCard = (props: VCardProps) : VCARD => new VCARD([
  new FNProperty([], new TextType(props.name)),
  ...props.emails.map((email) => 
    new EmailProperty(
      [new TypeParameter("emailproperty", new ParameterValueType("work"))],
      new TextType(email),
    )
  ),
  ...props.addresses.map((address) => new AdrProperty(
    [new TypeParameter("adrproperty", new ParameterValueType("work"))],
    new SpecialValueType("adrproperty", [
      new TextType(address)
    ]),
  )),
  ...props.telephones.map((telephone, index) => new TelProperty(
    [
      new ValueParameter(new URIType(`tel:${telephone}`)),
      new TypeParameter("telproperty", [
        new ParameterValueType("work"),
        new ParameterValueType("voice"),
      ]),
      new PrefParameter(new IntegerType(index + 1)),
    ],
    new URIType(`tel:${telephone}`),
  )),
  new OrgProperty(
    [new TypeParameter("orgproperty", new ParameterValueType("work"))],
    new SpecialValueType("orgproperty", [new TextType(props.organization)]),
  )
])

const downloadVCard = (vcard: VCARD, filename = 'card') => {
  const content = vcard.repr();
  const file = new File([content], `${filename}.vcf`, { type: 'text/plain' })
  const url = URL.createObjectURL(file)

  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  window.URL.revokeObjectURL(url)
}

@Component({
  selector: 'app-contacts-group',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contacts-group.component.html'
})
export class ContactsGroupComponent {
  @Input()
  contacts: Contact[]

  public getInitials(name: string): string {
    return name
      .split(' ')
      .reduce(
        (acc, currentName) =>
          currentName ? `${acc}${currentName[0].toUpperCase()}` : acc,
        ''
      )
  }

  public downloadCard = (contact: Contact) => {
    const card = createVCard({
      name: contact.name || ' ',
      emails: contact.emailAddress ? [contact.emailAddress || ' '] : [],
      addresses: contact.address ? [contact.address || ' '] : [],
      telephones: contact.phoneNumber ? [...(contact.phoneNumberOutsideWorkingHours ? [contact.phoneNumber || ' ', contact.phoneNumberOutsideWorkingHours || ' '] : [contact.phoneNumber || ' '])] : [],
      organization: contact.__typename === 'VisitingOfficeContact' && contact.name || ' '
    })
    downloadVCard(card, contact.name)
  }
}
