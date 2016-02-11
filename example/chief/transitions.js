module.exports = [
  { 
    from: 'out', to: 'idle', bi: true, animation: {
      button1: {
        delay: 0.5
      },

      button2: {
        delay: 0.6
      },

      button3: {
        delay: 0.7
      }
    } 
  },
  { 
    from: 'idle', to: 'selected2', bi: true
  },
  { 
    from: 'selected2', to: 'selected1', bi: true, animation: {
      indicator: {
        delay: 0.5
      }
    }
  },
  { 
    from: 'selected2', to: 'selected3', bi: true, animation: {
      indicator: {
        delay: 0.5
      }
    }
  },
  { 
    from: 'selected3', to: 'selected1', bi: true, animation: {
      indicator: {
        delay: 0.5
      }
    }
  }
];