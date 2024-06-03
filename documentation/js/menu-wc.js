'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">saiec documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminPageModule.html" data-type="entity-link" >AdminPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminPageModule-64bb535b37a5a117c32b5d3638e020544be7bba185e2833d3217023001661c1797671e59574bb6679d0ef9ac76e9d391c4754291a8692d2fe1fe40c5b24d49a9"' : 'data-bs-target="#xs-components-links-module-AdminPageModule-64bb535b37a5a117c32b5d3638e020544be7bba185e2833d3217023001661c1797671e59574bb6679d0ef9ac76e9d391c4754291a8692d2fe1fe40c5b24d49a9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPageModule-64bb535b37a5a117c32b5d3638e020544be7bba185e2833d3217023001661c1797671e59574bb6679d0ef9ac76e9d391c4754291a8692d2fe1fe40c5b24d49a9"' :
                                            'id="xs-components-links-module-AdminPageModule-64bb535b37a5a117c32b5d3638e020544be7bba185e2833d3217023001661c1797671e59574bb6679d0ef9ac76e9d391c4754291a8692d2fe1fe40c5b24d49a9"' }>
                                            <li class="link">
                                                <a href="components/AdminPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerifyEmailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerifyEmailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageRoutingModule.html" data-type="entity-link" >AdminPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdvPageModule.html" data-type="entity-link" >AdvPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdvPageModule-be09e678a2d2e1b658ed3141a27deea7760220a271177ebebee7542caf43382b094fdc6648838842bd31572f29e9566dacb56139a5c39a1d322f1cd18f45c681"' : 'data-bs-target="#xs-components-links-module-AdvPageModule-be09e678a2d2e1b658ed3141a27deea7760220a271177ebebee7542caf43382b094fdc6648838842bd31572f29e9566dacb56139a5c39a1d322f1cd18f45c681"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdvPageModule-be09e678a2d2e1b658ed3141a27deea7760220a271177ebebee7542caf43382b094fdc6648838842bd31572f29e9566dacb56139a5c39a1d322f1cd18f45c681"' :
                                            'id="xs-components-links-module-AdvPageModule-be09e678a2d2e1b658ed3141a27deea7760220a271177ebebee7542caf43382b094fdc6648838842bd31572f29e9566dacb56139a5c39a1d322f1cd18f45c681"' }>
                                            <li class="link">
                                                <a href="components/AdvPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdvPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdvPageRoutingModule.html" data-type="entity-link" >AdvPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-1bff5219521cceb0588f9e403e7ccd2c34f3801d404a9c8b53b857225f746e0cbadb4f3e54b0dbade64b66c4e15625d01d0a582ccdd71d5aa6cba8dc3f7c1399"' : 'data-bs-target="#xs-components-links-module-AppModule-1bff5219521cceb0588f9e403e7ccd2c34f3801d404a9c8b53b857225f746e0cbadb4f3e54b0dbade64b66c4e15625d01d0a582ccdd71d5aa6cba8dc3f7c1399"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1bff5219521cceb0588f9e403e7ccd2c34f3801d404a9c8b53b857225f746e0cbadb4f3e54b0dbade64b66c4e15625d01d0a582ccdd71d5aa6cba8dc3f7c1399"' :
                                            'id="xs-components-links-module-AppModule-1bff5219521cceb0588f9e403e7ccd2c34f3801d404a9c8b53b857225f746e0cbadb4f3e54b0dbade64b66c4e15625d01d0a582ccdd71d5aa6cba8dc3f7c1399"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-1bff5219521cceb0588f9e403e7ccd2c34f3801d404a9c8b53b857225f746e0cbadb4f3e54b0dbade64b66c4e15625d01d0a582ccdd71d5aa6cba8dc3f7c1399"' : 'data-bs-target="#xs-injectables-links-module-AppModule-1bff5219521cceb0588f9e403e7ccd2c34f3801d404a9c8b53b857225f746e0cbadb4f3e54b0dbade64b66c4e15625d01d0a582ccdd71d5aa6cba8dc3f7c1399"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1bff5219521cceb0588f9e403e7ccd2c34f3801d404a9c8b53b857225f746e0cbadb4f3e54b0dbade64b66c4e15625d01d0a582ccdd71d5aa6cba8dc3f7c1399"' :
                                        'id="xs-injectables-links-module-AppModule-1bff5219521cceb0588f9e403e7ccd2c34f3801d404a9c8b53b857225f746e0cbadb4f3e54b0dbade64b66c4e15625d01d0a582ccdd71d5aa6cba8dc3f7c1399"' }>
                                        <li class="link">
                                            <a href="injectables/MessagingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AutofeePageModule.html" data-type="entity-link" >AutofeePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AutofeePageModule-06a384ac784ddf7d31fc5016080482fb4b75904fd141522cbdd9ed8cf8a8437461eb5c3c9e7ce610c965a0fe604aad19a9f6fc053f321fd730551c94f202d484"' : 'data-bs-target="#xs-components-links-module-AutofeePageModule-06a384ac784ddf7d31fc5016080482fb4b75904fd141522cbdd9ed8cf8a8437461eb5c3c9e7ce610c965a0fe604aad19a9f6fc053f321fd730551c94f202d484"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AutofeePageModule-06a384ac784ddf7d31fc5016080482fb4b75904fd141522cbdd9ed8cf8a8437461eb5c3c9e7ce610c965a0fe604aad19a9f6fc053f321fd730551c94f202d484"' :
                                            'id="xs-components-links-module-AutofeePageModule-06a384ac784ddf7d31fc5016080482fb4b75904fd141522cbdd9ed8cf8a8437461eb5c3c9e7ce610c965a0fe604aad19a9f6fc053f321fd730551c94f202d484"' }>
                                            <li class="link">
                                                <a href="components/AutofeePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutofeePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AutofeePageRoutingModule.html" data-type="entity-link" >AutofeePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BirthdayPageModule.html" data-type="entity-link" >BirthdayPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BirthdayPageModule-5abc039ca8ee4b13d13935492e509e08dea8191a9b0d1e30f4bb709b0bcb30c4e813a2808dbe8137bc6bdbbe8ecc2f0483cca62e991b4b85a19be19fe3f07a81"' : 'data-bs-target="#xs-components-links-module-BirthdayPageModule-5abc039ca8ee4b13d13935492e509e08dea8191a9b0d1e30f4bb709b0bcb30c4e813a2808dbe8137bc6bdbbe8ecc2f0483cca62e991b4b85a19be19fe3f07a81"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BirthdayPageModule-5abc039ca8ee4b13d13935492e509e08dea8191a9b0d1e30f4bb709b0bcb30c4e813a2808dbe8137bc6bdbbe8ecc2f0483cca62e991b4b85a19be19fe3f07a81"' :
                                            'id="xs-components-links-module-BirthdayPageModule-5abc039ca8ee4b13d13935492e509e08dea8191a9b0d1e30f4bb709b0bcb30c4e813a2808dbe8137bc6bdbbe8ecc2f0483cca62e991b4b85a19be19fe3f07a81"' }>
                                            <li class="link">
                                                <a href="components/BirthdayPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BirthdayPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BirthdayPageRoutingModule.html" data-type="entity-link" >BirthdayPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EventsPageModule.html" data-type="entity-link" >EventsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EventsPageModule-424867681b7b5c529b37ae37462ae0d1b78a904e6d100576cbed513b8af55986a75d2db2ffaf97fd62e00ed843078d4696fe80e0fc53ffb1eb6bf589bde97dec"' : 'data-bs-target="#xs-components-links-module-EventsPageModule-424867681b7b5c529b37ae37462ae0d1b78a904e6d100576cbed513b8af55986a75d2db2ffaf97fd62e00ed843078d4696fe80e0fc53ffb1eb6bf589bde97dec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EventsPageModule-424867681b7b5c529b37ae37462ae0d1b78a904e6d100576cbed513b8af55986a75d2db2ffaf97fd62e00ed843078d4696fe80e0fc53ffb1eb6bf589bde97dec"' :
                                            'id="xs-components-links-module-EventsPageModule-424867681b7b5c529b37ae37462ae0d1b78a904e6d100576cbed513b8af55986a75d2db2ffaf97fd62e00ed843078d4696fe80e0fc53ffb1eb6bf589bde97dec"' }>
                                            <li class="link">
                                                <a href="components/EventsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsPageRoutingModule.html" data-type="entity-link" >EventsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EventTransactionBookPageModule.html" data-type="entity-link" >EventTransactionBookPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EventTransactionBookPageModule-0389dc2f279e9b6c2e6c7434158ac2d94b09548b016fecffa111ae7932bd947d236c5b201ebe6a485bc5dc0419ebf7dfc33c28195ef479e25fc47a14cbca8eca"' : 'data-bs-target="#xs-components-links-module-EventTransactionBookPageModule-0389dc2f279e9b6c2e6c7434158ac2d94b09548b016fecffa111ae7932bd947d236c5b201ebe6a485bc5dc0419ebf7dfc33c28195ef479e25fc47a14cbca8eca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EventTransactionBookPageModule-0389dc2f279e9b6c2e6c7434158ac2d94b09548b016fecffa111ae7932bd947d236c5b201ebe6a485bc5dc0419ebf7dfc33c28195ef479e25fc47a14cbca8eca"' :
                                            'id="xs-components-links-module-EventTransactionBookPageModule-0389dc2f279e9b6c2e6c7434158ac2d94b09548b016fecffa111ae7932bd947d236c5b201ebe6a485bc5dc0419ebf7dfc33c28195ef479e25fc47a14cbca8eca"' }>
                                            <li class="link">
                                                <a href="components/EventTransactionBookPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventTransactionBookPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TransactionFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventTransactionBookPageRoutingModule.html" data-type="entity-link" >EventTransactionBookPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExamDetailPageModule.html" data-type="entity-link" >ExamDetailPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExamDetailPageModule-6fac62e106ff40572a2c6ba8d0123dee334770a880706df4f16ebe5408ee83792cfa06d1105081e5a2b59329f2fe8928fff5c25c8be1d30f70932d5597dd83f3"' : 'data-bs-target="#xs-components-links-module-ExamDetailPageModule-6fac62e106ff40572a2c6ba8d0123dee334770a880706df4f16ebe5408ee83792cfa06d1105081e5a2b59329f2fe8928fff5c25c8be1d30f70932d5597dd83f3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExamDetailPageModule-6fac62e106ff40572a2c6ba8d0123dee334770a880706df4f16ebe5408ee83792cfa06d1105081e5a2b59329f2fe8928fff5c25c8be1d30f70932d5597dd83f3"' :
                                            'id="xs-components-links-module-ExamDetailPageModule-6fac62e106ff40572a2c6ba8d0123dee334770a880706df4f16ebe5408ee83792cfa06d1105081e5a2b59329f2fe8928fff5c25c8be1d30f70932d5597dd83f3"' }>
                                            <li class="link">
                                                <a href="components/ExamDetailPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamDetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExamDetailPageRoutingModule.html" data-type="entity-link" >ExamDetailPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExamFormPageModule.html" data-type="entity-link" >ExamFormPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExamFormPageModule-e2c47cafb4b284c4ec340243a5663b057f85a1406c9fd3a6b1740d79ca6032b962296e15a6db7df2972c3546f00d734e63aa9c68a4aa052af64c35b0380be825"' : 'data-bs-target="#xs-components-links-module-ExamFormPageModule-e2c47cafb4b284c4ec340243a5663b057f85a1406c9fd3a6b1740d79ca6032b962296e15a6db7df2972c3546f00d734e63aa9c68a4aa052af64c35b0380be825"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExamFormPageModule-e2c47cafb4b284c4ec340243a5663b057f85a1406c9fd3a6b1740d79ca6032b962296e15a6db7df2972c3546f00d734e63aa9c68a4aa052af64c35b0380be825"' :
                                            'id="xs-components-links-module-ExamFormPageModule-e2c47cafb4b284c4ec340243a5663b057f85a1406c9fd3a6b1740d79ca6032b962296e15a6db7df2972c3546f00d734e63aa9c68a4aa052af64c35b0380be825"' }>
                                            <li class="link">
                                                <a href="components/ExamFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExamFormPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamFormPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NonAcademicFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NonAcademicFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExamFormPageRoutingModule.html" data-type="entity-link" >ExamFormPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FacultyFormPageModule.html" data-type="entity-link" >FacultyFormPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FacultyFormPageModule-42f2ba902ee88dd57a096c7b4a6ac814f193cacb8f9061d69d2853dceb157a2ca0e741c756e3329ee1c70b8bdbe032a00be134bfb1916f283d34611b41754eac"' : 'data-bs-target="#xs-components-links-module-FacultyFormPageModule-42f2ba902ee88dd57a096c7b4a6ac814f193cacb8f9061d69d2853dceb157a2ca0e741c756e3329ee1c70b8bdbe032a00be134bfb1916f283d34611b41754eac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FacultyFormPageModule-42f2ba902ee88dd57a096c7b4a6ac814f193cacb8f9061d69d2853dceb157a2ca0e741c756e3329ee1c70b8bdbe032a00be134bfb1916f283d34611b41754eac"' :
                                            'id="xs-components-links-module-FacultyFormPageModule-42f2ba902ee88dd57a096c7b4a6ac814f193cacb8f9061d69d2853dceb157a2ca0e741c756e3329ee1c70b8bdbe032a00be134bfb1916f283d34611b41754eac"' }>
                                            <li class="link">
                                                <a href="components/FacultyFormPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacultyFormPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FacultyFormPageRoutingModule.html" data-type="entity-link" >FacultyFormPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FacultyPageModule.html" data-type="entity-link" >FacultyPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FacultyPageModule-81ff981788b41216b8f42c161062e77c604fd4f1c4fd1f5d0e99a4461254b4c28beadd47d91099fceae7a5413a0c6bcc3ff1649f52163f5ed96dcdd1d88154aa"' : 'data-bs-target="#xs-components-links-module-FacultyPageModule-81ff981788b41216b8f42c161062e77c604fd4f1c4fd1f5d0e99a4461254b4c28beadd47d91099fceae7a5413a0c6bcc3ff1649f52163f5ed96dcdd1d88154aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FacultyPageModule-81ff981788b41216b8f42c161062e77c604fd4f1c4fd1f5d0e99a4461254b4c28beadd47d91099fceae7a5413a0c6bcc3ff1649f52163f5ed96dcdd1d88154aa"' :
                                            'id="xs-components-links-module-FacultyPageModule-81ff981788b41216b8f42c161062e77c604fd4f1c4fd1f5d0e99a4461254b4c28beadd47d91099fceae7a5413a0c6bcc3ff1649f52163f5ed96dcdd1d88154aa"' }>
                                            <li class="link">
                                                <a href="components/FacultyPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacultyPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FacultyPageRoutingModule.html" data-type="entity-link" >FacultyPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FolderPageModule.html" data-type="entity-link" >FolderPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FolderPageModule-f2f82c3ff7aa58615dc383d4e47458c1b586820582c84cadab3818cd86c9cf3b69610bcfd9c17b4123887a01b00371b7de1f8c431ac8f08be777d3c713a73d6c"' : 'data-bs-target="#xs-components-links-module-FolderPageModule-f2f82c3ff7aa58615dc383d4e47458c1b586820582c84cadab3818cd86c9cf3b69610bcfd9c17b4123887a01b00371b7de1f8c431ac8f08be777d3c713a73d6c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FolderPageModule-f2f82c3ff7aa58615dc383d4e47458c1b586820582c84cadab3818cd86c9cf3b69610bcfd9c17b4123887a01b00371b7de1f8c431ac8f08be777d3c713a73d6c"' :
                                            'id="xs-components-links-module-FolderPageModule-f2f82c3ff7aa58615dc383d4e47458c1b586820582c84cadab3818cd86c9cf3b69610bcfd9c17b4123887a01b00371b7de1f8c431ac8f08be777d3c713a73d6c"' }>
                                            <li class="link">
                                                <a href="components/FolderPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FolderPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FolderPageRoutingModule.html" data-type="entity-link" >FolderPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GalleryPageModule.html" data-type="entity-link" >GalleryPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GalleryPageModule-2e0c3c7a89e75caa0066286ddd7a8cf90e9fc80002384e17517785f634e3aeb976422823e05cc0eef2c06801aaf05e16b2bb63a9746a57519362ea27e046b876"' : 'data-bs-target="#xs-components-links-module-GalleryPageModule-2e0c3c7a89e75caa0066286ddd7a8cf90e9fc80002384e17517785f634e3aeb976422823e05cc0eef2c06801aaf05e16b2bb63a9746a57519362ea27e046b876"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GalleryPageModule-2e0c3c7a89e75caa0066286ddd7a8cf90e9fc80002384e17517785f634e3aeb976422823e05cc0eef2c06801aaf05e16b2bb63a9746a57519362ea27e046b876"' :
                                            'id="xs-components-links-module-GalleryPageModule-2e0c3c7a89e75caa0066286ddd7a8cf90e9fc80002384e17517785f634e3aeb976422823e05cc0eef2c06801aaf05e16b2bb63a9746a57519362ea27e046b876"' }>
                                            <li class="link">
                                                <a href="components/GalleryPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GalleryPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GalleryPageRoutingModule.html" data-type="entity-link" >GalleryPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HolidayCalenderPageModule.html" data-type="entity-link" >HolidayCalenderPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HolidayCalenderPageModule-269fe707c32de32bd750dbd9676d6bcc22772d7bbc2aaaf274d8a55f8c485a1f956da1d3f319639272964a6d42e8c4dcae243c50560edd5ae35b1f51a47c13c6"' : 'data-bs-target="#xs-components-links-module-HolidayCalenderPageModule-269fe707c32de32bd750dbd9676d6bcc22772d7bbc2aaaf274d8a55f8c485a1f956da1d3f319639272964a6d42e8c4dcae243c50560edd5ae35b1f51a47c13c6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HolidayCalenderPageModule-269fe707c32de32bd750dbd9676d6bcc22772d7bbc2aaaf274d8a55f8c485a1f956da1d3f319639272964a6d42e8c4dcae243c50560edd5ae35b1f51a47c13c6"' :
                                            'id="xs-components-links-module-HolidayCalenderPageModule-269fe707c32de32bd750dbd9676d6bcc22772d7bbc2aaaf274d8a55f8c485a1f956da1d3f319639272964a6d42e8c4dcae243c50560edd5ae35b1f51a47c13c6"' }>
                                            <li class="link">
                                                <a href="components/HolidayCalenderPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HolidayCalenderPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HolidayCalenderPageRoutingModule.html" data-type="entity-link" >HolidayCalenderPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-061e84e8b11b60cf9451ed0ecdb5e8d16b5f47f16bbac90a1590686e8a5af71e32f8c13624e2f59b9a1d4bca5d08c47da71c9b94db1bca4b2da89d75be3c8b29"' : 'data-bs-target="#xs-components-links-module-HomePageModule-061e84e8b11b60cf9451ed0ecdb5e8d16b5f47f16bbac90a1590686e8a5af71e32f8c13624e2f59b9a1d4bca5d08c47da71c9b94db1bca4b2da89d75be3c8b29"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-061e84e8b11b60cf9451ed0ecdb5e8d16b5f47f16bbac90a1590686e8a5af71e32f8c13624e2f59b9a1d4bca5d08c47da71c9b94db1bca4b2da89d75be3c8b29"' :
                                            'id="xs-components-links-module-HomePageModule-061e84e8b11b60cf9451ed0ecdb5e8d16b5f47f16bbac90a1590686e8a5af71e32f8c13624e2f59b9a1d4bca5d08c47da71c9b94db1bca4b2da89d75be3c8b29"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ModalPageModule.html" data-type="entity-link" >ModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ModalPageModule-bbcd3db3a2386565ca6a7c1a9fea9186022e5bdd23fa0c93e44ba21c4f95e3cc8742f0b3bf3a3b2c12a9a43547bb937bb635dd7a31aa490ae617144b4194baf6"' : 'data-bs-target="#xs-components-links-module-ModalPageModule-bbcd3db3a2386565ca6a7c1a9fea9186022e5bdd23fa0c93e44ba21c4f95e3cc8742f0b3bf3a3b2c12a9a43547bb937bb635dd7a31aa490ae617144b4194baf6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalPageModule-bbcd3db3a2386565ca6a7c1a9fea9186022e5bdd23fa0c93e44ba21c4f95e3cc8742f0b3bf3a3b2c12a9a43547bb937bb635dd7a31aa490ae617144b4194baf6"' :
                                            'id="xs-components-links-module-ModalPageModule-bbcd3db3a2386565ca6a7c1a9fea9186022e5bdd23fa0c93e44ba21c4f95e3cc8742f0b3bf3a3b2c12a9a43547bb937bb635dd7a31aa490ae617144b4194baf6"' }>
                                            <li class="link">
                                                <a href="components/ModalPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalPageRoutingModule.html" data-type="entity-link" >ModalPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationFormPageModule.html" data-type="entity-link" >NotificationFormPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NotificationFormPageModule-69ff69dd0be7be2cd5d89b456aa4efeac4811848b7f224080082c51496d2c5e46b76a64b1f521332d36eb78c7621c5fe943a82c11d6f55c1943770d2d1182d4c"' : 'data-bs-target="#xs-components-links-module-NotificationFormPageModule-69ff69dd0be7be2cd5d89b456aa4efeac4811848b7f224080082c51496d2c5e46b76a64b1f521332d36eb78c7621c5fe943a82c11d6f55c1943770d2d1182d4c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificationFormPageModule-69ff69dd0be7be2cd5d89b456aa4efeac4811848b7f224080082c51496d2c5e46b76a64b1f521332d36eb78c7621c5fe943a82c11d6f55c1943770d2d1182d4c"' :
                                            'id="xs-components-links-module-NotificationFormPageModule-69ff69dd0be7be2cd5d89b456aa4efeac4811848b7f224080082c51496d2c5e46b76a64b1f521332d36eb78c7621c5fe943a82c11d6f55c1943770d2d1182d4c"' }>
                                            <li class="link">
                                                <a href="components/NotificationFormPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationFormPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationFormPageRoutingModule.html" data-type="entity-link" >NotificationFormPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationPageModule.html" data-type="entity-link" >NotificationPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NotificationPageModule-ba09b4a6eb9b9aa3af96ba6de17aec1490706854bcceed056c50d5d3bc7160bd3fdce08fc9f900b12622e3fd18d721ff3314bf28612a744a995f15fcc81fc0f6"' : 'data-bs-target="#xs-components-links-module-NotificationPageModule-ba09b4a6eb9b9aa3af96ba6de17aec1490706854bcceed056c50d5d3bc7160bd3fdce08fc9f900b12622e3fd18d721ff3314bf28612a744a995f15fcc81fc0f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificationPageModule-ba09b4a6eb9b9aa3af96ba6de17aec1490706854bcceed056c50d5d3bc7160bd3fdce08fc9f900b12622e3fd18d721ff3314bf28612a744a995f15fcc81fc0f6"' :
                                            'id="xs-components-links-module-NotificationPageModule-ba09b4a6eb9b9aa3af96ba6de17aec1490706854bcceed056c50d5d3bc7160bd3fdce08fc9f900b12622e3fd18d721ff3314bf28612a744a995f15fcc81fc0f6"' }>
                                            <li class="link">
                                                <a href="components/NotificationPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationPageRoutingModule.html" data-type="entity-link" >NotificationPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OfferingPageModule.html" data-type="entity-link" >OfferingPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OfferingPageModule-8ff8f6149c76e4db4f6bd1e8cf19788df5a446b5d234a8a9527e80b94c60a49667378ede27bb2bd3d45fb59c33608f4db0beb772002d685d17122aed28e32029"' : 'data-bs-target="#xs-components-links-module-OfferingPageModule-8ff8f6149c76e4db4f6bd1e8cf19788df5a446b5d234a8a9527e80b94c60a49667378ede27bb2bd3d45fb59c33608f4db0beb772002d685d17122aed28e32029"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OfferingPageModule-8ff8f6149c76e4db4f6bd1e8cf19788df5a446b5d234a8a9527e80b94c60a49667378ede27bb2bd3d45fb59c33608f4db0beb772002d685d17122aed28e32029"' :
                                            'id="xs-components-links-module-OfferingPageModule-8ff8f6149c76e4db4f6bd1e8cf19788df5a446b5d234a8a9527e80b94c60a49667378ede27bb2bd3d45fb59c33608f4db0beb772002d685d17122aed28e32029"' }>
                                            <li class="link">
                                                <a href="components/OfferingFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfferingPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferingPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OfferingPageRoutingModule.html" data-type="entity-link" >OfferingPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/QuestionsetPageModule.html" data-type="entity-link" >QuestionsetPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-QuestionsetPageModule-f5722825f7a00cd657e87e1dfb3777c0899e7267a02947e781cfb91dc42d6e3cf7c389bd98b0eb0ba06fd0a56965e9690ac260ed513a93ada3ef5d0c2f930bec"' : 'data-bs-target="#xs-components-links-module-QuestionsetPageModule-f5722825f7a00cd657e87e1dfb3777c0899e7267a02947e781cfb91dc42d6e3cf7c389bd98b0eb0ba06fd0a56965e9690ac260ed513a93ada3ef5d0c2f930bec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuestionsetPageModule-f5722825f7a00cd657e87e1dfb3777c0899e7267a02947e781cfb91dc42d6e3cf7c389bd98b0eb0ba06fd0a56965e9690ac260ed513a93ada3ef5d0c2f930bec"' :
                                            'id="xs-components-links-module-QuestionsetPageModule-f5722825f7a00cd657e87e1dfb3777c0899e7267a02947e781cfb91dc42d6e3cf7c389bd98b0eb0ba06fd0a56965e9690ac260ed513a93ada3ef5d0c2f930bec"' }>
                                            <li class="link">
                                                <a href="components/QuestionsetPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionsetPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuestionsetPageRoutingModule.html" data-type="entity-link" >QuestionsetPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ReportPageModule.html" data-type="entity-link" >ReportPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReportPageModule-f1105bbd3fc2240778f3f6f28fa9c5b373cfb4c8637336b2953cb2a3d971b30b661175fafd5e5986f1ea4de2c4b85278fbe562d06b366eaecf35ced0c0a650d9"' : 'data-bs-target="#xs-components-links-module-ReportPageModule-f1105bbd3fc2240778f3f6f28fa9c5b373cfb4c8637336b2953cb2a3d971b30b661175fafd5e5986f1ea4de2c4b85278fbe562d06b366eaecf35ced0c0a650d9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportPageModule-f1105bbd3fc2240778f3f6f28fa9c5b373cfb4c8637336b2953cb2a3d971b30b661175fafd5e5986f1ea4de2c4b85278fbe562d06b366eaecf35ced0c0a650d9"' :
                                            'id="xs-components-links-module-ReportPageModule-f1105bbd3fc2240778f3f6f28fa9c5b373cfb4c8637336b2953cb2a3d971b30b661175fafd5e5986f1ea4de2c4b85278fbe562d06b366eaecf35ced0c0a650d9"' }>
                                            <li class="link">
                                                <a href="components/GraphComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GraphComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportPage</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ReportPageModule-f1105bbd3fc2240778f3f6f28fa9c5b373cfb4c8637336b2953cb2a3d971b30b661175fafd5e5986f1ea4de2c4b85278fbe562d06b366eaecf35ced0c0a650d9"' : 'data-bs-target="#xs-directives-links-module-ReportPageModule-f1105bbd3fc2240778f3f6f28fa9c5b373cfb4c8637336b2953cb2a3d971b30b661175fafd5e5986f1ea4de2c4b85278fbe562d06b366eaecf35ced0c0a650d9"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ReportPageModule-f1105bbd3fc2240778f3f6f28fa9c5b373cfb4c8637336b2953cb2a3d971b30b661175fafd5e5986f1ea4de2c4b85278fbe562d06b366eaecf35ced0c0a650d9"' :
                                        'id="xs-directives-links-module-ReportPageModule-f1105bbd3fc2240778f3f6f28fa9c5b373cfb4c8637336b2953cb2a3d971b30b661175fafd5e5986f1ea4de2c4b85278fbe562d06b366eaecf35ced0c0a650d9"' }>
                                        <li class="link">
                                            <a href="directives/MarkBaseDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MarkBaseDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportPageRoutingModule.html" data-type="entity-link" >ReportPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StaffPaymentPageModule.html" data-type="entity-link" >StaffPaymentPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StaffPaymentPageModule-52653c9763ec7743f585375f4c17c2ccda9065b7e2798a1c8e7d9ac88e8558b92b28428a5976c8cc1db88f6442406194be7412a55545bd2e77e4862fb6368a5b"' : 'data-bs-target="#xs-components-links-module-StaffPaymentPageModule-52653c9763ec7743f585375f4c17c2ccda9065b7e2798a1c8e7d9ac88e8558b92b28428a5976c8cc1db88f6442406194be7412a55545bd2e77e4862fb6368a5b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StaffPaymentPageModule-52653c9763ec7743f585375f4c17c2ccda9065b7e2798a1c8e7d9ac88e8558b92b28428a5976c8cc1db88f6442406194be7412a55545bd2e77e4862fb6368a5b"' :
                                            'id="xs-components-links-module-StaffPaymentPageModule-52653c9763ec7743f585375f4c17c2ccda9065b7e2798a1c8e7d9ac88e8558b92b28428a5976c8cc1db88f6442406194be7412a55545bd2e77e4862fb6368a5b"' }>
                                            <li class="link">
                                                <a href="components/StaffPaymentPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StaffPaymentPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StaffPaymentPageRoutingModule.html" data-type="entity-link" >StaffPaymentPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StaffTabularViewPageModule.html" data-type="entity-link" >StaffTabularViewPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StaffTabularViewPageModule-16df065e429c770c9c499cdb9e65244e8bc0969423b67e609721bce3f8df2a2bc0796491bbf726f440bd979f300dc1b26e0f4bcbdf97f196cdda6c89f1a07f9a"' : 'data-bs-target="#xs-components-links-module-StaffTabularViewPageModule-16df065e429c770c9c499cdb9e65244e8bc0969423b67e609721bce3f8df2a2bc0796491bbf726f440bd979f300dc1b26e0f4bcbdf97f196cdda6c89f1a07f9a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StaffTabularViewPageModule-16df065e429c770c9c499cdb9e65244e8bc0969423b67e609721bce3f8df2a2bc0796491bbf726f440bd979f300dc1b26e0f4bcbdf97f196cdda6c89f1a07f9a"' :
                                            'id="xs-components-links-module-StaffTabularViewPageModule-16df065e429c770c9c499cdb9e65244e8bc0969423b67e609721bce3f8df2a2bc0796491bbf726f440bd979f300dc1b26e0f4bcbdf97f196cdda6c89f1a07f9a"' }>
                                            <li class="link">
                                                <a href="components/StaffTabularViewPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StaffTabularViewPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StaffTabularViewPageRoutingModule.html" data-type="entity-link" >StaffTabularViewPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StorePageModule.html" data-type="entity-link" >StorePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StorePageModule-f6661b5b0058dd0102d42a6f08ff6342d6f14f7cb24a2d11cb7ff9146dd67d675f9bbacfe941676b7cc17561e2d61aa71921818e259b86afa6631c32a951faba"' : 'data-bs-target="#xs-components-links-module-StorePageModule-f6661b5b0058dd0102d42a6f08ff6342d6f14f7cb24a2d11cb7ff9146dd67d675f9bbacfe941676b7cc17561e2d61aa71921818e259b86afa6631c32a951faba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StorePageModule-f6661b5b0058dd0102d42a6f08ff6342d6f14f7cb24a2d11cb7ff9146dd67d675f9bbacfe941676b7cc17561e2d61aa71921818e259b86afa6631c32a951faba"' :
                                            'id="xs-components-links-module-StorePageModule-f6661b5b0058dd0102d42a6f08ff6342d6f14f7cb24a2d11cb7ff9146dd67d675f9bbacfe941676b7cc17561e2d61aa71921818e259b86afa6631c32a951faba"' }>
                                            <li class="link">
                                                <a href="components/StorePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StorePageRoutingModule.html" data-type="entity-link" >StorePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentAutoFeePageModule.html" data-type="entity-link" >StudentAutoFeePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StudentAutoFeePageModule-765913d358cb47ded9d1022601dcb657c575a1c2cb669af36d5f768c9c7af55e60979b3cece560faf659bdfe18ad05db6ac22c619a8348558514ac8bb4a890e6"' : 'data-bs-target="#xs-components-links-module-StudentAutoFeePageModule-765913d358cb47ded9d1022601dcb657c575a1c2cb669af36d5f768c9c7af55e60979b3cece560faf659bdfe18ad05db6ac22c619a8348558514ac8bb4a890e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentAutoFeePageModule-765913d358cb47ded9d1022601dcb657c575a1c2cb669af36d5f768c9c7af55e60979b3cece560faf659bdfe18ad05db6ac22c619a8348558514ac8bb4a890e6"' :
                                            'id="xs-components-links-module-StudentAutoFeePageModule-765913d358cb47ded9d1022601dcb657c575a1c2cb669af36d5f768c9c7af55e60979b3cece560faf659bdfe18ad05db6ac22c619a8348558514ac8bb4a890e6"' }>
                                            <li class="link">
                                                <a href="components/StudentAutoFeePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentAutoFeePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentAutoFeePageRoutingModule.html" data-type="entity-link" >StudentAutoFeePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentDetailPageModule.html" data-type="entity-link" >StudentDetailPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StudentDetailPageModule-44ee971b8d612604868647091a2b67c897df79dd2f43a5068f648a371963dfed149bac1f259e89d8c49642407281c32f7f112b34e688f17f55ec3930b4b92195"' : 'data-bs-target="#xs-components-links-module-StudentDetailPageModule-44ee971b8d612604868647091a2b67c897df79dd2f43a5068f648a371963dfed149bac1f259e89d8c49642407281c32f7f112b34e688f17f55ec3930b4b92195"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentDetailPageModule-44ee971b8d612604868647091a2b67c897df79dd2f43a5068f648a371963dfed149bac1f259e89d8c49642407281c32f7f112b34e688f17f55ec3930b4b92195"' :
                                            'id="xs-components-links-module-StudentDetailPageModule-44ee971b8d612604868647091a2b67c897df79dd2f43a5068f648a371963dfed149bac1f259e89d8c49642407281c32f7f112b34e688f17f55ec3930b4b92195"' }>
                                            <li class="link">
                                                <a href="components/StudentDetailPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentDetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentDetailPageRoutingModule.html" data-type="entity-link" >StudentDetailPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentFeePageModule.html" data-type="entity-link" >StudentFeePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StudentFeePageModule-335577f440b43e250bbb03c85cd723f661aca61f9c3e4c5efe64c92fa2a8303454f25674a5d69de0f92640003fe6348b3b6e4e4d82c312b74280f96b3d53f669"' : 'data-bs-target="#xs-components-links-module-StudentFeePageModule-335577f440b43e250bbb03c85cd723f661aca61f9c3e4c5efe64c92fa2a8303454f25674a5d69de0f92640003fe6348b3b6e4e4d82c312b74280f96b3d53f669"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentFeePageModule-335577f440b43e250bbb03c85cd723f661aca61f9c3e4c5efe64c92fa2a8303454f25674a5d69de0f92640003fe6348b3b6e4e4d82c312b74280f96b3d53f669"' :
                                            'id="xs-components-links-module-StudentFeePageModule-335577f440b43e250bbb03c85cd723f661aca61f9c3e4c5efe64c92fa2a8303454f25674a5d69de0f92640003fe6348b3b6e4e4d82c312b74280f96b3d53f669"' }>
                                            <li class="link">
                                                <a href="components/StudentFeePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentFeePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentFeePageRoutingModule.html" data-type="entity-link" >StudentFeePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentPageModule.html" data-type="entity-link" >StudentPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StudentPageModule-617cfaa53579e83be549aa5a35248672cee4e3b2f0d27169adf950296a08a9815f43a114baef4a031d0f2e588ad5413eb3f754fb382e488268ec41ef2bf25426"' : 'data-bs-target="#xs-components-links-module-StudentPageModule-617cfaa53579e83be549aa5a35248672cee4e3b2f0d27169adf950296a08a9815f43a114baef4a031d0f2e588ad5413eb3f754fb382e488268ec41ef2bf25426"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentPageModule-617cfaa53579e83be549aa5a35248672cee4e3b2f0d27169adf950296a08a9815f43a114baef4a031d0f2e588ad5413eb3f754fb382e488268ec41ef2bf25426"' :
                                            'id="xs-components-links-module-StudentPageModule-617cfaa53579e83be549aa5a35248672cee4e3b2f0d27169adf950296a08a9815f43a114baef4a031d0f2e588ad5413eb3f754fb382e488268ec41ef2bf25426"' }>
                                            <li class="link">
                                                <a href="components/ExtractStudentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExtractStudentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentPageRoutingModule.html" data-type="entity-link" >StudentPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentSchoolFeePageModule.html" data-type="entity-link" >StudentSchoolFeePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StudentSchoolFeePageModule-e40b1c6b3f94bc0efa8862e9f32cabd1e9e32effd930641eb9d2a98e315dcd74f2ab7c6d7ae2d610f8010ed2050a0e07db157be6ef1e56e7601b7dbfa9d589e4"' : 'data-bs-target="#xs-components-links-module-StudentSchoolFeePageModule-e40b1c6b3f94bc0efa8862e9f32cabd1e9e32effd930641eb9d2a98e315dcd74f2ab7c6d7ae2d610f8010ed2050a0e07db157be6ef1e56e7601b7dbfa9d589e4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentSchoolFeePageModule-e40b1c6b3f94bc0efa8862e9f32cabd1e9e32effd930641eb9d2a98e315dcd74f2ab7c6d7ae2d610f8010ed2050a0e07db157be6ef1e56e7601b7dbfa9d589e4"' :
                                            'id="xs-components-links-module-StudentSchoolFeePageModule-e40b1c6b3f94bc0efa8862e9f32cabd1e9e32effd930641eb9d2a98e315dcd74f2ab7c6d7ae2d610f8010ed2050a0e07db157be6ef1e56e7601b7dbfa9d589e4"' }>
                                            <li class="link">
                                                <a href="components/StudentSchoolFeePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSchoolFeePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentSchoolFeePageRoutingModule.html" data-type="entity-link" >StudentSchoolFeePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentTabularPageModule.html" data-type="entity-link" >StudentTabularPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StudentTabularPageModule-1f5199260e4c3a29194b8123d98d1b07268f98a5c858657c7b848ebb8c5054509b9af06ff2097b390896113c7fe0529f06db2d087451ea1662982caf4b11ceef"' : 'data-bs-target="#xs-components-links-module-StudentTabularPageModule-1f5199260e4c3a29194b8123d98d1b07268f98a5c858657c7b848ebb8c5054509b9af06ff2097b390896113c7fe0529f06db2d087451ea1662982caf4b11ceef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentTabularPageModule-1f5199260e4c3a29194b8123d98d1b07268f98a5c858657c7b848ebb8c5054509b9af06ff2097b390896113c7fe0529f06db2d087451ea1662982caf4b11ceef"' :
                                            'id="xs-components-links-module-StudentTabularPageModule-1f5199260e4c3a29194b8123d98d1b07268f98a5c858657c7b848ebb8c5054509b9af06ff2097b390896113c7fe0529f06db2d087451ea1662982caf4b11ceef"' }>
                                            <li class="link">
                                                <a href="components/StudentTabularPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentTabularPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentTabularPageRoutingModule.html" data-type="entity-link" >StudentTabularPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionReportPageModule.html" data-type="entity-link" >TransactionReportPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TransactionReportPageModule-b1ce885a2c3ce04eeb4b8b2703541f9648263cd872d752446532f36e9ac7e6306ff18225342c25b8b31f155e3bb826b4c2e4e5b1f43b26c141c167aae22af52e"' : 'data-bs-target="#xs-components-links-module-TransactionReportPageModule-b1ce885a2c3ce04eeb4b8b2703541f9648263cd872d752446532f36e9ac7e6306ff18225342c25b8b31f155e3bb826b4c2e4e5b1f43b26c141c167aae22af52e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TransactionReportPageModule-b1ce885a2c3ce04eeb4b8b2703541f9648263cd872d752446532f36e9ac7e6306ff18225342c25b8b31f155e3bb826b4c2e4e5b1f43b26c141c167aae22af52e"' :
                                            'id="xs-components-links-module-TransactionReportPageModule-b1ce885a2c3ce04eeb4b8b2703541f9648263cd872d752446532f36e9ac7e6306ff18225342c25b8b31f155e3bb826b4c2e4e5b1f43b26c141c167aae22af52e"' }>
                                            <li class="link">
                                                <a href="components/TransactionReportPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionReportPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionReportPageRoutingModule.html" data-type="entity-link" >TransactionReportPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ReportFormComponent.html" data-type="entity-link" >ReportFormComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FileUpload.html" data-type="entity-link" >FileUpload</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DownloadUrlService.html" data-type="entity-link" >DownloadUrlService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsService.html" data-type="entity-link" >EventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FetchFileService.html" data-type="entity-link" >FetchFileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileUploadService.html" data-type="entity-link" >FileUploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseService.html" data-type="entity-link" >FirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessagingService.html" data-type="entity-link" >MessagingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToasterService.html" data-type="entity-link" >ToasterService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});