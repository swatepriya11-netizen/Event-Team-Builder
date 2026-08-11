document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startOrganizingBtn');
  const launchBtn = document.getElementById('launchWorkspaceBtn');
  const exploreBtn = document.getElementById('exploreFlowBtn');
  const createBtn = document.getElementById('createEventBtn');

  startBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  launchBtn.addEventListener('click', () => {
    window.location.href = 'workspace.html';
  });

  exploreBtn.addEventListener('click', () => {
    window.location.href = 'workflow.html';
  });

  createBtn.addEventListener('click', () => {
    window.location.href = 'create-event.html';
  });

  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});