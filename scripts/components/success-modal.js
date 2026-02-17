// Генерация и показ модального окна успеха отправвки форм


export function showSuccessModal(title, message, iconClass) {
    const modalHTML = `
    <div class="modal fade" id="dynamicSuccessModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4">
                <div class="modal-header bg-success text-white border-0">
                    <h5 class="modal-title fs-4 fw-bold">${title}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center py-5">
                    <i class="bi ${iconClass} text-success" style="font-size: 4rem;"></i>
                    <h4 class="mt-3 fw-bold">Заявка принята</h4>
                    <p class="text-muted mt-3">${message}</p>
                </div>
                <div class="modal-footer border-0 justify-content-center pb-4">
                    <button type="button" class="btn btn-success px-5 py-2" data-bs-dismiss="modal">Хорошо</button>
                </div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalElement = document.getElementById('dynamicSuccessModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    modalElement.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
    
    return modalElement;
}